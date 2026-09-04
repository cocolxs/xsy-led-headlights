import { Injectable, Inject, Logger } from '@nestjs/common';
import { DRIZZLE_DATABASE, type PostgresJsDatabase } from '@lark-apaas/fullstack-nestjs-core';
import { pageViews, sessions } from '@server/database/schema';
import { eq, and, gte, count, countDistinct, desc, sql, avg } from 'drizzle-orm';
import type {
  RealtimeStats,
  PageViewDetail,
  PagePerformanceItem,
  CountryStatItem,
  DeviceOsStatItem,
  AnalyticsListParams,
} from '@shared/api.interface';
import { getEndOfDay } from '@server/common/utils/date-helper';

@Injectable()
export class AdminAnalyticsService {
  private readonly logger = new Logger(AdminAnalyticsService.name);

  constructor(@Inject(DRIZZLE_DATABASE) private readonly db: PostgresJsDatabase) {}

  async getRealtimeStats(): Promise<RealtimeStats> {
    try {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

      const [onlineResult, recentViewsResult] = await Promise.all([
        this.db
          .select({ count: countDistinct(sessions.sessionId) })
          .from(sessions)
          .where(gte(sessions.lastVisitAt, fiveMinutesAgo)),
        this.db
          .select({ count: count() })
          .from(pageViews)
          .where(gte(pageViews.createdAt, tenMinutesAgo)),
      ]);

      return {
        onlineUsers: Number(onlineResult[0]?.count ?? 0),
        recent10minViews: Number(recentViewsResult[0]?.count ?? 0),
      };
    } catch (error) {
      this.logger.error(`获取实时统计失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async getPageViewList(params: AnalyticsListParams): Promise<{
    items: PageViewDetail[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;
    const offset = (page - 1) * pageSize;

    const conditions = [];
    if (params.dateFrom) {
      conditions.push(gte(pageViews.createdAt, new Date(params.dateFrom)));
    }
    if (params.dateTo) {
      const endDate = getEndOfDay(new Date(params.dateTo)).toISOString();
      conditions.push(sql`${pageViews.createdAt} <= ${endDate}`);
    }

    try {
      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
      const countQuery = this.db.select({ count: count() }).from(pageViews);
      const listQuery = this.db
        .select()
        .from(pageViews)
        .orderBy(desc(pageViews.createdAt))
        .limit(pageSize)
        .offset(offset);

      const [countResult, rows] = await Promise.all([
        whereClause ? countQuery.where(whereClause) : countQuery,
        whereClause ? listQuery.where(whereClause) : listQuery,
      ]);

      const total = Number(countResult[0]?.count ?? 0);
      const items: PageViewDetail[] = rows.map((row) => ({
        id: row.id,
        sessionId: row.sessionId ?? '',
        url: row.url,
        pageTitle: row.pageTitle ?? '',
        referrer: row.referrer ?? '',
        device: row.device ?? '',
        browser: row.browser ?? '',
        os: row.os ?? '',
        countryGuess: row.countryGuess ?? '',
        durationSeconds: row.durationSeconds ?? 0,
        createdAt: row.createdAt.toISOString(),
      }));

      return { items, total, page, pageSize };
    } catch (error) {
      this.logger.error(`获取页面浏览列表失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async getPagePerformance(dateFrom?: string, dateTo?: string): Promise<PagePerformanceItem[]> {
    const { fromIso, toIso } = this.buildDateRange(dateFrom, dateTo);

    try {
      const result = await this.db.execute(sql`
        SELECT
          url,
          MAX(page_title) as page_title,
          count(*) as pv,
          count(DISTINCT user_fingerprint) as uv,
          AVG(duration_seconds) as avg_duration,
          SUM(CASE WHEN is_single = 1 THEN 1 ELSE 0 END)::float / count(*) as bounce_rate
        FROM (
          SELECT
            pv.*,
            CASE WHEN s.page_count = 1 THEN 1 ELSE 0 END as is_single
          FROM page_views pv
          LEFT JOIN sessions s ON pv.session_id = s.session_id
          WHERE pv._created_at >= ${fromIso} AND pv._created_at <= ${toIso}
        ) sub
        GROUP BY url
        ORDER BY pv DESC
        LIMIT 50
      `) as unknown as Array<{
        url: string;
        page_title: string;
        pv: string;
        uv: string;
        avg_duration: string;
        bounce_rate: string;
      }>;

      return result.map((row) => ({
        url: row.url,
        pageTitle: row.page_title ?? '',
        pv: Number(row.pv),
        uv: Number(row.uv),
        avgDuration: Math.round(Number(row.avg_duration)),
        bounceRate: Math.round(Number(row.bounce_rate) * 10000) / 100,
      }));
    } catch (error) {
      this.logger.error(`获取页面性能失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async getCountryStats(dateFrom?: string, dateTo?: string): Promise<CountryStatItem[]> {
    const { fromIso, toIso } = this.buildDateRange(dateFrom, dateTo);

    try {
      const result = await this.db.execute(sql`
        SELECT
          COALESCE(NULLIF(country_guess, ''), 'Unknown') as country,
          count(*) as pv,
          count(DISTINCT user_fingerprint) as uv
        FROM page_views
        WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
        GROUP BY country
        ORDER BY pv DESC
        LIMIT 30
      `) as unknown as Array<{ country: string; pv: string; uv: string }>;

      return result.map((row) => ({
        country: row.country,
        pv: Number(row.pv),
        uv: Number(row.uv),
        inquiries: 0,
      }));
    } catch (error) {
      this.logger.error(`获取国家统计失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async getDeviceStats(dateFrom?: string, dateTo?: string): Promise<DeviceOsStatItem[]> {
    return this.getCategoryStats('device', dateFrom, dateTo);
  }

  async getBrowserStats(dateFrom?: string, dateTo?: string): Promise<DeviceOsStatItem[]> {
    return this.getCategoryStats('browser', dateFrom, dateTo);
  }

  async getOsStats(dateFrom?: string, dateTo?: string): Promise<DeviceOsStatItem[]> {
    return this.getCategoryStats('os', dateFrom, dateTo);
  }

  private async getCategoryStats(
    column: 'device' | 'browser' | 'os',
    dateFrom?: string,
    dateTo?: string,
  ): Promise<DeviceOsStatItem[]> {
    const { fromIso, toIso } = this.buildDateRange(dateFrom, dateTo);
    const col = column === 'os' ? 'os' : column;

    try {
      const result = await this.db.execute(sql`
        SELECT
          COALESCE(NULLIF(${sql.raw(col)}, ''), 'Unknown') as value,
          count(*) as count
        FROM page_views
        WHERE _created_at >= ${fromIso} AND _created_at <= ${toIso}
        GROUP BY value
        ORDER BY count DESC
      `) as unknown as Array<{ value: string; count: string }>;

      const total = result.reduce((acc: number, row) => acc + Number(row.count), 0);

      return result.map((row) => ({
        category: column,
        value: row.value,
        count: Number(row.count),
        percentage: total > 0 ? Math.round((Number(row.count) / total) * 10000) / 100 : 0,
      }));
    } catch (error) {
      this.logger.error(`获取${column}统计失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  private buildDateRange(dateFrom?: string, dateTo?: string): { fromIso: string; toIso: string } {
    const fromIso = dateFrom
      ? new Date(dateFrom).toISOString()
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const toIso = dateTo ? getEndOfDay(new Date(dateTo)).toISOString() : new Date().toISOString();
    return { fromIso, toIso };
  }
}
