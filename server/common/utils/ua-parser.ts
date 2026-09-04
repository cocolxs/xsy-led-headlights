export interface UAParseResult {
  device: string;
  browser: string;
  os: string;
}

export function parseUserAgent(userAgent: string | undefined): UAParseResult {
  const ua = (userAgent || '').toLowerCase();

  // Device detection
  let device = 'desktop';
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/.test(ua)) {
    device = 'mobile';
  } else if (/tablet|ipad|playbook|silk|kindle/.test(ua)) {
    device = 'tablet';
  }

  // Browser detection
  let browser = 'Unknown';
  if (/edg\//.test(ua)) {
    browser = 'Edge';
  } else if (/chrome|crios|crmo/.test(ua)) {
    browser = 'Chrome';
  } else if (/firefox|fxios/.test(ua)) {
    browser = 'Firefox';
  } else if (/safari/.test(ua) && !/chrome/.test(ua)) {
    browser = 'Safari';
  } else if (/opr\//.test(ua) || /opera/.test(ua)) {
    browser = 'Opera';
  } else if (/msie|trident/.test(ua)) {
    browser = 'Internet Explorer';
  }

  // OS detection
  let os = 'Unknown';
  if (/windows nt 10/.test(ua) || /windows nt 11/.test(ua)) {
    os = 'Windows';
  } else if (/windows/.test(ua)) {
    os = 'Windows';
  } else if (/mac os x|macintosh/.test(ua)) {
    os = 'macOS';
  } else if (/android/.test(ua)) {
    os = 'Android';
  } else if (/iphone|ipad|ipod|ios/.test(ua)) {
    os = 'iOS';
  } else if (/linux/.test(ua)) {
    os = 'Linux';
  }

  return { device, browser, os };
}
