// Analytics tracking utility
// - sessionId (cookie, 30 min)
// - userFingerprint (localStorage)
// - UTM capture & cookie storage (7 days)
// - Page view + click event tracking
// - Duration tracking via visibilitychange + beforeunload
// - Device type detection

import { trackingApi } from '@client/src/api';

const SESSION_COOKIE = 'xsy_session';
const FP_KEY = 'xsy_fp';
const UTM_COOKIE_PREFIX = 'xsy_utm_';
const UTM_KEYS = ['source', 'medium', 'campaign', 'term', 'content'] as const;
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes
const UTM_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

let sessionStartTime = Date.now();

// ---------- Cookie helpers ----------

function setCookie(name: string, value: string, ttlMs: number) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + ttlMs).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp('(^|; )' + name + '=([^;]*)'),
  );
  return match ? decodeURIComponent(match[2]) : null;
}

// ---------- Simple hash (djb2) ----------
function hashString(str: string): string {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
  }
  // unsigned hex
  return (h >>> 0).toString(16).padStart(8, '0');
}

// ---------- Session ID ----------

export function getSessionId(): string {
  let sid = getCookie(SESSION_COOKIE);
  if (!sid) {
    sid =
      's_' +
      Date.now().toString(36) +
      '_' +
      Math.random().toString(36).slice(2, 10);
  }
  // Refresh TTL on every access (rolling session)
  setCookie(SESSION_COOKIE, sid, SESSION_TTL_MS);
  sessionStartTime = Date.now();
  return sid;
}

// ---------- User Fingerprint ----------

export function getUserFingerprint(): string {
  if (typeof localStorage === 'undefined') return 'fp_unknown';
  let fp = localStorage.getItem(FP_KEY);
  if (fp) return fp;

  const parts: string[] = [];
  if (typeof navigator !== 'undefined') {
    parts.push(navigator.userAgent || '');
    parts.push(navigator.language || '');
    parts.push(navigator.platform || '');
  }
  if (typeof screen !== 'undefined') {
    parts.push(String(screen.width));
    parts.push(String(screen.height));
    parts.push(String(screen.colorDepth));
  }
  if (typeof Intl !== 'undefined') {
    try {
      parts.push(Intl.DateTimeFormat().resolvedOptions().timeZone || '');
    } catch {
      /* ignore */
    }
  }
  const raw = parts.join('|') + '|' + Date.now().toString(36);
  fp = 'fp_' + hashString(raw);
  try {
    localStorage.setItem(FP_KEY, fp);
  } catch {
    /* ignore */
  }
  return fp;
}

// ---------- UTM capture ----------

export function captureUtmParams(): void {
  if (typeof window === 'undefined' || !window.location) return;
  const url = new URL(window.location.href);
  let captured = false;
  UTM_KEYS.forEach((key) => {
    const value = url.searchParams.get(`utm_${key}`);
    if (value !== null) {
      setCookie(`${UTM_COOKIE_PREFIX}${key}`, value, UTM_TTL_MS);
      captured = true;
    }
  });
  if (captured) {
    const referrer = document.referrer || '';
    if (referrer) {
      setCookie('xsy_referrer', referrer, UTM_TTL_MS);
    }
  }
}

export function getUtmParams(): Record<string, string> {
  const result: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const val = getCookie(`${UTM_COOKIE_PREFIX}${key}`);
    if (val) result[key] = val;
  });
  const ref = getCookie('xsy_referrer');
  if (ref) result.referrer = ref;
  return result;
}

// ---------- Device type ----------

export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent.toLowerCase();
  if (/mobile|android.*mobile|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) {
    return 'mobile';
  }
  if (/tablet|ipad|android(?!.*mobile)/i.test(ua)) {
    return 'tablet';
  }
  return 'desktop';
}

// ---------- Duration tracking ----------

let currentPageUrl = '';
let currentPageStart = Date.now();

function reportDuration() {
  const durationSeconds = Math.max(
    1,
    Math.floor((Date.now() - currentPageStart) / 1000),
  );
  if (!currentPageUrl) return;
  try {
    trackingApi.updateDuration({
      sessionId: getSessionId(),
      url: currentPageUrl,
      durationSeconds,
    });
  } catch {
    /* ignore */
  }
}

export function initDurationTracking(): void {
  if (typeof document === 'undefined') return;

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      reportDuration();
    } else {
      // Reset start when returning to page
      currentPageStart = Date.now();
    }
  });

  window.addEventListener('beforeunload', () => {
    reportDuration();
    // Use sendBeacon as a best-effort backup
    try {
      const durationSeconds = Math.max(
        1,
        Math.floor((Date.now() - currentPageStart) / 1000),
      );
      const payload = JSON.stringify({
        sessionId: getSessionId(),
        url: currentPageUrl,
        durationSeconds,
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/track/page-view/duration', payload);
      }
    } catch {
      /* ignore */
    }
  });
}

// ---------- Page view tracking ----------

export async function trackPageView(
  url: string,
  title: string,
  language: string,
): Promise<void> {
  // Report duration for the previous page first
  if (currentPageUrl && currentPageUrl !== url) {
    reportDuration();
  }
  currentPageUrl = url;
  currentPageStart = Date.now();
  getSessionId(); // ensure session cookie is set

  try {
    await trackingApi.trackPageView({
      sessionId: getSessionId(),
      userFingerprint: getUserFingerprint(),
      url,
      pageTitle: title,
      referrer: document.referrer || '',
      language,
    });
  } catch {
    /* ignore errors silently */
  }
}

// ---------- Click tracking ----------

export async function trackClick(
  elementType: string,
  elementText: string,
  elementId: string,
  targetUrl: string,
): Promise<void> {
  try {
    await trackingApi.trackClick({
      sessionId: getSessionId(),
      userFingerprint: getUserFingerprint(),
      pageUrl: currentPageUrl || window.location.pathname,
      elementType,
      elementText,
      elementId,
      targetUrl,
    });
  } catch {
    /* ignore errors silently */
  }
}

// ---------- Initialize on import (client-side) ----------

export function initTracking(): void {
  if (typeof window === 'undefined') return;
  captureUtmParams();
  getSessionId();
  initDurationTracking();
}
