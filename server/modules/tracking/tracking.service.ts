import { Injectable, Inject, Logger } from '@nestjs/common';
import { DRIZZLE_DATABASE, type PostgresJsDatabase } from '@lark-apaas/fullstack-nestjs-core';
import { pageViews, clickEvents, sessions } from '@server/database/schema';
import { eq, and, desc, isNull } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import type { PageViewPayload, ClickEventPayload, PageViewDurationUpdate } from '@shared/api.interface';
import { parseUserAgent } from '@server/common/utils/ua-parser';
import type { UTMCookieParams } from '@server/common/utils/cookie-helper';

interface PageViewResult {
  pageViewId: string;
  sessionId: string;
}

@Injectable()
export class TrackingService {
  private readonly logger = new Logger(TrackingService.name);

  constructor(@Inject(DRIZZLE_DATABASE) private readonly db: PostgresJsDatabase) {}

  async trackPageView(
    payload: PageViewPayload,
    utmParams: UTMCookieParams,
    ip: string,
    userAgent: string,
  ): Promise<PageViewResult> {
    const uaInfo = parseUserAgent(userAgent);
    let { sessionId, userFingerprint, url, pageTitle, referrer, language } = payload;

    if (!sessionId) {
      sessionId = `sess_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
    }
    if (!userFingerprint) {
      userFingerprint = `fp_${randomUUID().replace(/-/g, '').slice(0, 12)}`;
    }

    try {
      const existingSessions = await this.db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionId, sessionId))
        .limit(1);

      let finalSessionId = sessionId;

      if (existingSessions.length > 0) {
        // Update existing session
        await this.db
          .update(sessions)
          .set({
            lastVisitAt: new Date(),
            pageCount: (existingSessions[0].pageCount ?? 0) + 1,
          })
          .where(eq(sessions.sessionId, sessionId));
      } else {
        // Create new session
        await this.db.insert(sessions).values({
          sessionId,
          userFingerprint,
          firstVisitAt: new Date(),
          lastVisitAt: new Date(),
          pageCount: 1,
          utmSource: utmParams.utmSource,
          utmMedium: utmParams.utmMedium,
          utmCampaign: utmParams.utmCampaign,
          device: uaInfo.device,
          ip,
        } as never);
        finalSessionId = sessionId;
      }

      // Insert page view
      const pvRows = await this.db
        .insert(pageViews)
        .values({
          sessionId,
          userFingerprint,
          url,
          pageTitle,
          referrer,
          utmSource: utmParams.utmSource,
          utmMedium: utmParams.utmMedium,
          utmCampaign: utmParams.utmCampaign,
          utmTerm: utmParams.utmTerm,
          utmContent: utmParams.utmContent,
          ip,
          userAgent,
          device: uaInfo.device,
          browser: uaInfo.browser,
          os: uaInfo.os,
          language,
          durationSeconds: 0,
        } as never)
        .returning({ id: pageViews.id });

      return { pageViewId: pvRows[0].id, sessionId: finalSessionId };
    } catch (error) {
      this.logger.error(`记录页面浏览失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async trackClick(
    payload: ClickEventPayload,
    utmParams: UTMCookieParams,
  ): Promise<{ id: string }> {
    try {
      const rows = await this.db
        .insert(clickEvents)
        .values({
          sessionId: payload.sessionId,
          userFingerprint: payload.userFingerprint,
          pageUrl: payload.pageUrl,
          elementType: payload.elementType,
          elementText: payload.elementText,
          elementId: payload.elementId,
          targetUrl: payload.targetUrl,
          utmSource: utmParams.utmSource,
          utmMedium: utmParams.utmMedium,
          utmCampaign: utmParams.utmCampaign,
        } as never)
        .returning({ id: clickEvents.id });

      return { id: rows[0].id };
    } catch (error) {
      this.logger.error(`记录点击事件失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async updateDuration(payload: PageViewDurationUpdate): Promise<{ success: boolean }> {
    try {
      if (!payload.sessionId || !payload.url) {
        return { success: false };
      }
      const recentPvs = await this.db
        .select()
        .from(pageViews)
        .where(and(eq(pageViews.sessionId, payload.sessionId), eq(pageViews.url, payload.url)))
        .orderBy(desc(pageViews.createdAt))
        .limit(1);

      if (recentPvs.length === 0) {
        return { success: false };
      }

      const duration = Math.max(0, Math.floor(payload.durationSeconds));
      await this.db
        .update(pageViews)
        .set({ durationSeconds: duration })
        .where(eq(pageViews.id, recentPvs[0].id));

      return { success: true };
    } catch (error) {
      this.logger.error(`更新页面停留时长失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }
}
