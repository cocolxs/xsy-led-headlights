// ====== Product Types ======

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  model: string;
  socketType: string;
  powerW: number;
  lumen: number;
  colorTempK: number;
  voltage: string;
  ipRate: string;
  lifespanHours: number;
  material: string;
  description?: string;
  descriptionEn?: string;
  features: string[];
  images: string[];
  moq: number;
  packaging?: string;
  deliveryTime?: string;
  warranty: string;
  priceRange?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListParams {
  socketType?: string;
  page?: number;
  pageSize?: number;
}

export interface ProductListResponse {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
}

// ====== Inquiry Types ======

export interface Inquiry {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  country?: string;
  productId?: string;
  productName?: string;
  quantity?: number;
  message?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
  ip?: string;
  userAgent?: string;
  device?: string;
  browser?: string;
  os?: string;
  countryGuess?: string;
  status: InquiryStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type InquiryStatus = 'new' | 'contacted' | 'quoted' | 'converted' | 'lost';

export interface CreateInquiryRequest {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  country?: string;
  productId?: string;
  productName?: string;
  quantity?: number;
  message?: string;
}

export interface InquiryListParams {
  status?: InquiryStatus;
  utmSource?: string;
  country?: string;
  productId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface InquiryListResponse {
  items: Inquiry[];
  total: number;
  page: number;
  pageSize: number;
}

export interface UpdateInquiryRequest {
  status?: InquiryStatus;
  notes?: string;
}

// ====== Tracking Types ======

export interface PageViewPayload {
  sessionId: string;
  userFingerprint: string;
  url: string;
  pageTitle: string;
  referrer: string;
  language: string;
}

export interface ClickEventPayload {
  sessionId: string;
  userFingerprint: string;
  pageUrl: string;
  elementType: string;
  elementText: string;
  elementId: string;
  targetUrl: string;
}

export interface PageViewDurationUpdate {
  sessionId: string;
  url: string;
  durationSeconds: number;
}

// ====== Admin Auth Types ======

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  token: string;
  admin: {
    id: string;
    username: string;
    name: string;
    role: string;
    mustChangePassword: boolean;
  };
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

// ====== Dashboard Types ======

export interface DashboardStats {
  today: {
    pv: number;
    uv: number;
    inquiries: number;
    conversionRate: number;
    avgDuration: number;
    newVisitors: number;
    returningVisitors: number;
  };
  week: {
    pv: number;
    uv: number;
    inquiries: number;
    conversionRate: number;
    avgDuration: number;
    newVisitors: number;
    returningVisitors: number;
  };
  month: {
    pv: number;
    uv: number;
    inquiries: number;
    conversionRate: number;
    avgDuration: number;
    newVisitors: number;
    returningVisitors: number;
  };
}

export interface TrendDataPoint {
  date: string;
  pv: number;
  uv: number;
  inquiries: number;
}

export interface SourceDistributionItem {
  source: string;
  count: number;
  percentage: number;
}

export interface DeviceDistributionItem {
  device: string;
  count: number;
  percentage: number;
}

export interface TopPageItem {
  url: string;
  pageTitle: string;
  pv: number;
  uv: number;
  avgDuration: number;
}

export interface FunnelData {
  step: string;
  count: number;
  percentage: number;
}

export interface DashboardResponse {
  stats: DashboardStats;
  trend30d: TrendDataPoint[];
  sourceDistribution: SourceDistributionItem[];
  deviceDistribution: DeviceDistributionItem[];
  topPages: TopPageItem[];
  latestInquiries: Inquiry[];
  funnel: FunnelData[];
}

// ====== Marketing Analytics Types ======

export interface ChannelPerformanceItem {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  pv: number;
  uv: number;
  inquiries: number;
  conversionRate: number;
  avgDuration: number;
}

export interface CampaignComparisonItem {
  campaign: string;
  pv: number;
  uv: number;
  inquiries: number;
  conversionRate: number;
}

export interface TermContentItem {
  term: string;
  pv: number;
  inquiries: number;
  conversionRate: number;
}

export interface DailyChannelTrendItem {
  date: string;
  source: string;
  pv: number;
  inquiries: number;
}

export interface MarketingAnalyticsParams {
  dateFrom?: string;
  dateTo?: string;
  period?: 'today' | '7d' | '30d' | 'custom';
}

export interface MarketingAnalyticsResponse {
  channelPerformance: ChannelPerformanceItem[];
  campaignComparison: CampaignComparisonItem[];
  termAnalysis: TermContentItem[];
  contentAnalysis: TermContentItem[];
  dailyTrend: DailyChannelTrendItem[];
}

// ====== Analytics Types ======

export interface RealtimeStats {
  onlineUsers: number;
  recent10minViews: number;
}

export interface PageViewDetail {
  id: string;
  sessionId: string;
  url: string;
  pageTitle: string;
  referrer: string;
  device: string;
  browser: string;
  os: string;
  countryGuess: string;
  durationSeconds: number;
  createdAt: string;
}

export interface UserJourneyStep {
  type: 'page_view' | 'click';
  url: string;
  pageTitle?: string;
  elementText?: string;
  elementType?: string;
  timestamp: string;
}

export interface UserJourneySession {
  sessionId: string;
  userFingerprint: string;
  firstVisitAt: string;
  lastVisitAt: string;
  pageCount: number;
  device: string;
  countryGuess: string;
  utmSource: string;
  steps: UserJourneyStep[];
}

export interface PagePerformanceItem {
  url: string;
  pageTitle: string;
  pv: number;
  uv: number;
  avgDuration: number;
  bounceRate: number;
}

export interface CountryStatItem {
  country: string;
  pv: number;
  uv: number;
  inquiries: number;
}

export interface DeviceOsStatItem {
  category: string;
  value: string;
  count: number;
  percentage: number;
}

export interface AnalyticsListParams {
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  pageSize?: number;
}

export interface AnalyticsResponse {
  realtime: RealtimeStats;
  pageViews: {
    items: PageViewDetail[];
    total: number;
    page: number;
    pageSize: number;
  };
  pagePerformance: PagePerformanceItem[];
  countryStats: CountryStatItem[];
  deviceStats: DeviceOsStatItem[];
  browserStats: DeviceOsStatItem[];
  osStats: DeviceOsStatItem[];
}

// ====== Site Settings Types ======

export interface SiteSettings {
  companyName: string;
  companyNameEn: string;
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
  workingHours: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ga4Id: string;
  gtmId: string;
  facebookPixelId: string;
  googleAdsId: string;
  notificationEmail: string;
}

export type SettingKey = keyof SiteSettings;

// ====== Socket Types ======

export const SOCKET_TYPES = [
  'H1', 'H4', 'H7', 'H11', '9005', '9006', '9012', 'D2S', 'D3S'
] as const;

export type SocketType = typeof SOCKET_TYPES[number];

// ====== Language Types ======

export type LanguageCode = 'en' | 'zh' | 'es' | 'de' | 'fr' | 'ja' | 'ru' | 'ar';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  rtl?: boolean;
}
