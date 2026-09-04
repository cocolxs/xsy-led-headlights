import { Injectable, Inject, Logger } from '@nestjs/common';
import { DRIZZLE_DATABASE, type PostgresJsDatabase } from '@lark-apaas/fullstack-nestjs-core';
import { pageViews, inquiries } from '@server/database/schema';
import { sql } from 'drizzle-orm';
import type {
  MarketingAnalyticsResponse,
  ChannelPerformanceItem,
  CampaignComparisonItem,
  TermContentItem,
  DailyChannelTrendItem,
} from '@shared/api.interface';
import { getEndOfDay, getDaysAgo } from '@server/common/utils/date-helper';

interface MarketingParams {
  dateFrom?: string;
  dateTo?: string;
  period?: 'today' | '7d' | '30d' | 'custom';
}

@Injectable()
export class AdminMarketingService {
  private readonly logger = new Logger(AdminMarketingService.name);

  constructor(@Inject(DRIZZLE_DATABASE) private readonly db: PostgresJsDatabase) {}

  async getMarketingAnalytics(params: MarketingParams): Promise<MarketingAnalyticsResponse> {
    const { fromIso, toIso } = this.buildDateRange(params);

    try {
      const [channelPerformance, campaignComparison, termAnalysis, contentAnalysis, dailyTrend] =
        await Promise.all([
          this.getChannelPerformance(fromIso, toIso),
          this.getCampaignComparison(fromIso, toIso),
          this.getTermAnalysis(fromIso, toIso),
          this.getContentAnalysis(fromIso, toIso),
          this.getDailyTrend(fromIso, toIso),
        ]);

      return { channelPerformance, campaignComparison, termAnalysis, contentAnalysis, dailyTrend };
    } catch (error) {
      this.logger.error(`获取营销分析失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  private async getChannelPerformance(
    fromIso: string,
    toIso: string,
  ): Promise<ChannelPerformanceItem[]> {
    const pvResult = await this.db.execute(sql`
      SELECT
        COALESCE(NULLIF(utm_source, ''), 'Direct') as utm_source,
        COALESCE(NULLIF(utm_medium, ''), '(none)') as utm_medium,
        COALESCE(NULLIF(utm_campaign, ''), '(none)') as utm_campaign,
        count(*) as pv,
        count(DISTINCT user_fingerprint) as uv,
        AVG(duration_seconds) as avg_duration
      FROM page_views
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
      GROUP BY utm_source, utm_medium, utm_campaign
      ORDER BY pv DESC
    `) as unknown as Array<{
      utm_source: string;
      utm_medium: string;
      utm_campaign: string;
      pv: string;
      uv: string;
      avg_duration: string;
    }>;

    const inquiryResult = await this.db.execute(sql`
      SELECT
        COALESCE(NULLIF(utm_source, ''), 'Direct') as utm_source,
        COALESCE(NULLIF(utm_medium, ''), '(none)') as utm_medium,
        COALESCE(NULLIF(utm_campaign, ''), '(none)') as utm_campaign,
        count(*) as inquiries
      FROM inquiries
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
      GROUP BY utm_source, utm_medium, utm_campaign
    `) as unknown as Array<{
      utm_source: string;
      utm_medium: string;
      utm_campaign: string;
      inquiries: string;
    }>;

    const inquiryMap = new Map<string, number>();
    for (const row of inquiryResult) {
      const key = `${row.utm_source}|${row.utm_medium}|${row.utm_campaign}`;
      inquiryMap.set(key, Number(row.inquiries));
    }

    return pvResult.map((row) => {
      const key = `${row.utm_source}|${row.utm_medium}|${row.utm_campaign}`;
      const inquiries = inquiryMap.get(key) ?? 0;
      const uv = Number(row.uv);
      return {
        utmSource: row.utm_source,
        utmMedium: row.utm_medium,
        utmCampaign: row.utm_campaign,
        pv: Number(row.pv),
        uv,
        inquiries,
        conversionRate: uv > 0 ? Math.round((inquiries / uv) * 10000) / 100 : 0,
        avgDuration: Math.round(Number(row.avg_duration)),
      };
    });
  }

  private async getCampaignComparison(
    fromIso: string,
    toIso: string,
  ): Promise<CampaignComparisonItem[]> {
    const pvResult = await this.db.execute(sql`
      SELECT
        COALESCE(NULLIF(utm_campaign, ''), '(none)') as campaign,
        count(*) as pv,
        count(DISTINCT user_fingerprint) as uv
      FROM page_views
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
        AND utm_source IS NOT NULL AND utm_source != ''
      GROUP BY campaign
      ORDER BY pv DESC
    `) as unknown as Array<{ campaign: string; pv: string; uv: string }>;

    const inquiryResult = await this.db.execute(sql`
      SELECT
        COALESCE(NULLIF(utm_campaign, ''), '(none)') as campaign,
        count(*) as inquiries
      FROM inquiries
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
        AND utm_source IS NOT NULL AND utm_source != ''
      GROUP BY campaign
    `) as unknown as Array<{ campaign: string; inquiries: string }>;

    const inquiryMap = new Map<string, number>();
    for (const row of inquiryResult) {
      inquiryMap.set(row.campaign, Number(row.inquiries));
    }

    return pvResult.map((row) => {
      const inquiries = inquiryMap.get(row.campaign) ?? 0;
      const uv = Number(row.uv);
      return {
        campaign: row.campaign,
        pv: Number(row.pv),
        uv,
        inquiries,
        conversionRate: uv > 0 ? Math.round((inquiries / uv) * 10000) / 100 : 0,
      };
    });
  }

  private async getTermAnalysis(fromIso: string, toIso: string): Promise<TermContentItem[]> {
    const pvResult = await this.db.execute(sql`
      SELECT
        COALESCE(NULLIF(utm_term, ''), '(none)') as term,
        count(*) as pv
      FROM page_views
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
        AND utm_source IS NOT NULL AND utm_source != ''
      GROUP BY term
      ORDER BY pv DESC
      LIMIT 30
    `) as unknown as Array<{ term: string; pv: string }>;

    const inquiryResult = await this.db.execute(sql`
      SELECT
        COALESCE(NULLIF(utm_term, ''), '(none)') as term,
        count(*) as inquiries
      FROM inquiries
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
        AND utm_source IS NOT NULL AND utm_source != ''
      GROUP BY term
    `) as unknown as Array<{ term: string; inquiries: string }>;

    const inquiryMap = new Map<string, number>();
    for (const row of inquiryResult) {
      inquiryMap.set(row.term, Number(row.inquiries));
    }

    return pvResult.map((row) => {
      const inquiries = inquiryMap.get(row.term) ?? 0;
      const pv = Number(row.pv);
      return {
        term: row.term,
        pv,
        inquiries,
        conversionRate: pv > 0 ? Math.round((inquiries / pv) * 10000) / 100 : 0,
      };
    });
  }

  private async getContentAnalysis(fromIso: string, toIso: string): Promise<TermContentItem[]> {
    const pvResult = await this.db.execute(sql`
      SELECT
        COALESCE(NULLIF(utm_content, ''), '(none)') as term,
        count(*) as pv
      FROM page_views
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
        AND utm_source IS NOT NULL AND utm_source != ''
      GROUP BY term
      ORDER BY pv DESC
      LIMIT 30
    `) as unknown as Array<{ term: string; pv: string }>;

    const inquiryResult = await this.db.execute(sql`
      SELECT
        COALESCE(NULLIF(utm_content, ''), '(none)') as term,
        count(*) as inquiries
      FROM inquiries
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
        AND utm_source IS NOT NULL AND utm_source != ''
      GROUP BY term
    `) as unknown as Array<{ term: string; inquiries: string }>;

    const inquiryMap = new Map<string, number>();
    for (const row of inquiryResult) {
      inquiryMap.set(row.term, Number(row.inquiries));
    }

    return pvResult.map((row) => {
      const inquiries = inquiryMap.get(row.term) ?? 0;
      const pv = Number(row.pv);
      return {
        term: row.term,
        pv,
        inquiries,
        conversionRate: pv > 0 ? Math.round((inquiries / pv) * 10000) / 100 : 0,
      };
    });
  }

  private async getDailyTrend(fromIso: string, toIso: string): Promise<DailyChannelTrendItem[]> {
    const pvResult = await this.db.execute(sql`
      SELECT
        to_char(date_trunc('day', _created_at), 'YYYY-MM-DD') as date,
        COALESCE(NULLIF(utm_source, ''), 'Direct') as source,
        count(*) as pv
      FROM page_views
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
      GROUP BY date_trunc('day', _created_at), source
      ORDER BY date, pv DESC
    `) as unknown as Array<{ date: string; source: string; pv: string }>;

    const inquiryResult = await this.db.execute(sql`
      SELECT
        to_char(date_trunc('day', _created_at), 'YYYY-MM-DD') as date,
        COALESCE(NULLIF(utm_source, ''), 'Direct') as source,
        count(*) as inquiries
      FROM inquiries
      WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
      GROUP BY date_trunc('day', _created_at), source
      ORDER BY date
    `) as unknown as Array<{ date: string; source: string; inquiries: string }>;

    const inquiryMap = new Map<string, number>();
    for (const row of inquiryResult) {
      inquiryMap.set(`${row.date}|${row.source}`, Number(row.inquiries));
    }

    return pvResult.map((row) => ({
      date: row.date,
      source: row.source,
      pv: Number(row.pv),
      inquiries: inquiryMap.get(`${row.date}|${row.source}`) ?? 0,
    }));
  }

  private buildDateRange(params: MarketingParams): { fromIso: string; toIso: string } {
    const toIso = params.dateTo
      ? getEndOfDay(new Date(params.dateTo)).toISOString()
      : new Date().toISOString();

    let fromDate: Date;
    if (params.dateFrom && (params.period === 'custom' || !params.period)) {
      fromDate = new Date(params.dateFrom);
    } else {
      switch (params.period) {
        case 'today':
          fromDate = new Date();
          fromDate.setHours(0, 0, 0, 0);
          break;
        case '7d':
          fromDate = getDaysAgo(6);
          break;
        case '30d':
        default:
          fromDate = getDaysAgo(29);
          break;
      }
    }

    return { fromIso: fromDate.toISOString(), toIso };
  }
}
