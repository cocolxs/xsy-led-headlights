export interface UTMCookieParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

const UTM_COOKIE_MAP: Record<string, keyof UTMCookieParams> = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_term: 'utmTerm',
  utm_content: 'utmContent',
};

export function parseUTMFromCookies(
  cookieHeader: string | undefined,
): UTMCookieParams {
  const result: UTMCookieParams = {};
  if (!cookieHeader) return result;

  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [rawName, ...valueParts] = cookie.trim().split('=');
    const name = rawName.trim();
    const value = valueParts.join('=').trim();
    const targetKey = UTM_COOKIE_MAP[name];
    if (targetKey && value) {
      result[targetKey] = decodeURIComponent(value);
    }
  }

  return result;
}

export function getSessionIdFromCookies(
  cookieHeader: string | undefined,
): string | undefined {
  if (!cookieHeader) return undefined;
  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [rawName, ...valueParts] = cookie.trim().split('=');
    if (rawName.trim() === 'session_id' || rawName.trim() === 'tracking_session_id') {
      return valueParts.join('=').trim() || undefined;
    }
  }
  return undefined;
}
