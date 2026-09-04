import { Injectable, Inject, Logger } from '@nestjs/common';
import { DRIZZLE_DATABASE, type PostgresJsDatabase } from '@lark-apaas/fullstack-nestjs-core';
import { pageViews, sessions, inquiries, clickEvents, products } from '@server/database/schema';
import { eq, and, gte, count, countDistinct, desc, sql, sum, avg } from 'drizzle-orm';
import type {
  DashboardResponse,
  DashboardStats,
  TrendDataPoint,
  SourceDistributionItem,
  DeviceDistributionItem,
  TopPageItem,
  FunnelData,
  Inquiry,
} from '@shared/api.interface';
import { getDaysAgo, getStartOfDay, getEndOfDay, formatDateKey } from '@server/common/utils/date-helper';

interface StatsPeriodResult {
  pv: number;
  uv: number;
  inquiries: number;
  conversionRate: number;
  avgDuration: number;
  newVisitors: number;
  returningVisitors: number;
}

@Injectable()
export class AdminDashboardService {
  private readonly logger = new Logger(AdminDashboardService.name);

  constructor(@Inject(DRIZZLE_DATABASE) private readonly db: PostgresJsDatabase) {}

  async getDashboard(): Promise<DashboardResponse> {
    try {
      const [stats, trend30d, sourceDistribution, deviceDistribution, topPages, latestInquiries, funnel] =
        await Promise.all([
          this.getStats(),
          this.getTrend30d(),
          this.getSourceDistribution(),
          this.getDeviceDistribution(),
          this.getTopPages(),
          this.getLatestInquiries(),
          this.getFunnel(),
        ]);

      return { stats, trend30d, sourceDistribution, deviceDistribution, topPages, latestInquiries, funnel };
    } catch (error) {
      this.logger.error(`获取仪表盘数据失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  private async getStats(): Promise<DashboardStats> {
    const [today, week, month] = await Promise.all([
      this.getStatsForPeriod(getStartOfDay(new Date()), getEndOfDay(new Date())),
      this.getStatsForPeriod(getDaysAgo(6), getEndOfDay(new Date())),
      this.getStatsForPeriod(getDaysAgo(29), getEndOfDay(new Date())),
    ]);

    return { today, week, month };
  }

  private async getStatsForPeriod(from: Date, to: Date): Promise<StatsPeriodResult> {
    const fromIso = from.toISOString();
    const toIso = to.toISOString();

    const [pvResult, inquiryResult, durationResult, visitorResult] = await Promise.all([
      this.db
        .select({
          pv: count(),
          uv: countDistinct(pageViews.userFingerprint),
        })
        .from(pageViews)
        .where(
          and(
            sql`${pageViews.createdAt} >= ${fromIso}`,
            sql`${pageViews.createdAt} <= ${toIso}`,
          ),
        ),
      this.db
        .select({ count: count() })
        .from(inquiries)
        .where(
          and(
            sql`${inquiries.createdAt} >= ${fromIso}`,
            sql`${inquiries.createdAt} <= ${toIso}`,
          ),
        ),
      this.db
        .select({ avg: avg(pageViews.durationSeconds) })
        .from(pageViews)
        .where(
          and(
            sql`${pageViews.createdAt} >= ${fromIso}`,
            sql`${pageViews.createdAt} <= ${toIso}`,
          ),
        ),
      this.db
        .select({
          newCount: count(),
        })
        .from(sessions)
        .where(
          and(
            sql`${sessions.firstVisitAt} >= ${fromIso}`,
            sql`${sessions.firstVisitAt} <= ${toIso}`,
          ),
        ),
    ]);

    const pv = Number(pvResult[0]?.pv ?? 0);
    const uv = Number(pvResult[0]?.uv ?? 0);
    const inquiryCount = Number(inquiryResult[0]?.count ?? 0);
    const avgDuration = Number(durationResult[0]?.avg ?? 0);
    const newVisitors = Number(visitorResult[0]?.newCount ?? 0);
    const conversionRate = uv > 0 ? (inquiryCount / uv) * 100 : 0;

    // Returning visitors = total unique visitors (uv) minus new visitors
    const returningVisitors = Math.max(0, uv - newVisitors);

    return {
      pv,
      uv,
      inquiries: inquiryCount,
      conversionRate: Math.round(conversionRate * 100) / 100,
      avgDuration: Math.round(avgDuration),
      newVisitors,
      returningVisitors,
    };
  }

  private async getTrend30d(): Promise<TrendDataPoint[]> {
    const fromDate = getDaysAgo(29);
    const fromIso = fromDate.toISOString();
    const toIso = getEndOfDay(new Date()).toISOString();

    const pvTrendResult = await this.db.execute(sql`
      SELECT
        to_char(date_trunc('day', _created_at), 'YYYY-MM-DD') as date_str,
        count(*) as pv,
        count(DISTINCT user_fingerprint) as uv
      FROM page_views
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
      GROUP BY date_trunc('day', _created_at)
      ORDER BY date_str
    `) as unknown as Array<{ date_str: string; pv: string; uv: string }>;

    const inquiryTrendResult = await this.db.execute(sql`
      SELECT
        to_char(date_trunc('day', _created_at), 'YYYY-MM-DD') as date_str,
        count(*) as inquiries
      FROM inquiries
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
      GROUP BY date_trunc('day', _created_at)
      ORDER BY date_str
    `) as unknown as Array<{ date_str: string; inquiries: string }>;

    const pvMap = new Map<string, { pv: number; uv: number }>();
    for (const row of pvTrendResult) {
      pvMap.set(row.date_str, { pv: Number(row.pv), uv: Number(row.uv) });
    }

    const inquiryMap = new Map<string, number>();
    for (const row of inquiryTrendResult) {
      inquiryMap.set(row.date_str, Number(row.inquiries));
    }

    // Generate all 30 days
    const result: TrendDataPoint[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = formatDateKey(d);
      const pvData = pvMap.get(key) ?? { pv: 0, uv: 0 };
      result.push({
        date: key,
        pv: pvData.pv,
        uv: pvData.uv,
        inquiries: inquiryMap.get(key) ?? 0,
      });
    }

    return result;
  }

  private async getSourceDistribution(): Promise<SourceDistributionItem[]> {
    const fromIso = getDaysAgo(30).toISOString();
    const toIso = getEndOfDay(new Date()).toISOString();

    const sourceResult = await this.db.execute(sql`
      SELECT
        COALESCE(NULLIF(utm_source, ''), 'Direct') as source,
        count(*) as count
      FROM page_views
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
      GROUP BY source
      ORDER BY count DESC
    `) as unknown as Array<{ source: string; count: string }>;

    const total = sourceResult.reduce((acc: number, row) => acc + Number(row.count), 0);

    return sourceResult.map((row) => ({
      source: row.source,
      count: Number(row.count),
      percentage: total > 0 ? Math.round((Number(row.count) / total) * 10000) / 100 : 0,
    }));
  }

  private async getDeviceDistribution(): Promise<DeviceDistributionItem[]> {
    const fromIso = getDaysAgo(30).toISOString();
    const toIso = getEndOfDay(new Date()).toISOString();

    const deviceResult = await this.db.execute(sql`
      SELECT
        COALESCE(NULLIF(device, ''), 'Unknown') as device,
        count(*) as count
      FROM page_views
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
      GROUP BY device
      ORDER BY count DESC
    `) as unknown as Array<{ device: string; count: string }>;

    const total = deviceResult.reduce((acc: number, row) => acc + Number(row.count), 0);

    return deviceResult.map((row) => ({
      device: row.device,
      count: Number(row.count),
      percentage: total > 0 ? Math.round((Number(row.count) / total) * 10000) / 100 : 0,
    }));
  }

  private async getTopPages(): Promise<TopPageItem[]> {
    const fromIso = getDaysAgo(30).toISOString();
    const toIso = getEndOfDay(new Date()).toISOString();

    const topPagesResult = await this.db.execute(sql`
      SELECT
        url,
        MAX(page_title) as page_title,
        count(*) as pv,
        count(DISTINCT user_fingerprint) as uv,
        AVG(duration_seconds) as avg_duration
      FROM page_views
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
      GROUP BY url
      ORDER BY pv DESC
      LIMIT 10
    `) as unknown as Array<{ url: string; page_title: string; pv: string; uv: string; avg_duration: string }>;

    return topPagesResult.map((row) => ({
      url: row.url,
      pageTitle: row.page_title ?? '',
      pv: Number(row.pv),
      uv: Number(row.uv),
      avgDuration: Math.round(Number(row.avg_duration)),
    }));
  }

  private async getLatestInquiries(): Promise<Inquiry[]> {
    const rows = await this.db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt))
      .limit(5);

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      company: row.company ?? undefined,
      email: row.email,
      phone: row.phone ?? undefined,
      whatsapp: row.whatsapp ?? undefined,
      country: row.country ?? undefined,
      productId: row.productId ?? undefined,
      productName: row.productName ?? undefined,
      quantity: row.quantity ?? undefined,
      message: row.message ?? undefined,
      utmSource: row.utmSource ?? undefined,
      utmMedium: row.utmMedium ?? undefined,
      utmCampaign: row.utmCampaign ?? undefined,
      utmTerm: row.utmTerm ?? undefined,
      utmContent: row.utmContent ?? undefined,
      referrer: row.referrer ?? undefined,
      ip: row.ip ?? undefined,
      userAgent: row.userAgent ?? undefined,
      device: row.device ?? undefined,
      browser: row.browser ?? undefined,
      os: row.os ?? undefined,
      countryGuess: row.countryGuess ?? undefined,
      status: row.status as Inquiry['status'],
      notes: row.notes ?? undefined,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    }));
  }

  private async getFunnel(): Promise<FunnelData[]> {
    const fromIso = getDaysAgo(30).toISOString();
    const toIso = getEndOfDay(new Date()).toISOString();

    const [pvResult, productPvResult, inquiryClickResult, inquiryResult] = await Promise.all([
      this.db
        .select({ count: count() })
        .from(pageViews)
        .where(
          and(
            sql`${pageViews.createdAt} >= ${fromIso}`,
            sql`${pageViews.createdAt} <= ${toIso}`,
          ),
        ),
      this.db
        .select({ count: count() })
        .from(pageViews)
        .where(
          and(
            sql`${pageViews.createdAt} >= ${fromIso}`,
            sql`${pageViews.createdAt} <= ${toIso}`,
            sql`${pageViews.url} LIKE '%/products/%'`,
          ),
        ),
      this.db
        .select({ count: count() })
        .from(clickEvents)
        .where(
          and(
            sql`${clickEvents.createdAt} >= ${fromIso}`,
            sql`${clickEvents.createdAt} <= ${toIso}`,
            sql`LOWER(${clickEvents.elementText}) LIKE '%inquiry%'
              OR LOWER(${clickEvents.elementText}) LIKE '%quote%'
              OR LOWER(${clickEvents.elementText}) LIKE '%contact%'
              OR LOWER(${clickEvents.elementType}) LIKE '%inquiry%'`,
          ),
        ),
      this.db
        .select({ count: count() })
        .from(inquiries)
        .where(
          and(
            sql`${inquiries.createdAt} >= ${fromIso}`,
            sql`${inquiries.createdAt} <= ${toIso}`,
          ),
        ),
    ]);

    const pvCount = Number(pvResult[0]?.count ?? 0);
    const productPvCount = Number(productPvResult[0]?.count ?? 0);
    const inquiryClickCount = Number(inquiryClickResult[0]?.count ?? 0);
    const inquiryCount = Number(inquiryResult[0]?.count ?? 0);

    const funnel: FunnelData[] = [
      { step: '访问(PV)', count: pvCount, percentage: 100 },
      {
        step: '产品页浏览',
        count: productPvCount,
        percentage: pvCount > 0 ? Math.round((productPvCount / pvCount) * 10000) / 100 : 0,
      },
      {
        step: '询盘按钮点击',
        count: inquiryClickCount,
        percentage: pvCount > 0 ? Math.round((inquiryClickCount / pvCount) * 10000) / 100 : 0,
      },
      {
        step: '询盘提交',
        count: inquiryCount,
        percentage: pvCount > 0 ? Math.round((inquiryCount / pvCount) * 10000) / 100 : 0,
      },
    ];

    return funnel;
  }
}
