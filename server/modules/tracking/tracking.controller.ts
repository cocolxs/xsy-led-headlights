import { Controller, Post, Body, Req, Headers } from '@nestjs/common';
import type { Request } from 'express';
import { TrackingService } from './tracking.service';
import type { PageViewPayload, ClickEventPayload, PageViewDurationUpdate } from '@shared/api.interface';
import { parseUTMFromCookies } from '@server/common/utils/cookie-helper';

@Controller('api/track')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post('page-view')
  async trackPageView(
    @Body() payload: PageViewPayload,
    @Req() req: Request,
    @Headers('user-agent') userAgent?: string,
  ): Promise<{ pageViewId: string; sessionId: string }> {
    const cookieHeader = req.headers.cookie;
    const utmParams = parseUTMFromCookies(cookieHeader);
    const ip = this.getClientIp(req);

    return this.trackingService.trackPageView(payload, utmParams, ip, userAgent ?? '');
  }

  @Post('click')
  async trackClick(
    @Body() payload: ClickEventPayload,
    @Req() req: Request,
  ): Promise<{ id: string }> {
    const cookieHeader = req.headers.cookie;
    const utmParams = parseUTMFromCookies(cookieHeader);

    return this.trackingService.trackClick(payload, utmParams);
  }

  @Post('page-view/duration')
  async updateDuration(@Body() payload: PageViewDurationUpdate): Promise<{ success: boolean }> {
    return this.trackingService.updateDuration(payload);
  }

  private getClientIp(req: Request): string {
    const forwardedFor = req.headers['x-forwarded-for'];
    if (forwardedFor) {
      const firstIp = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor.split(',')[0];
      return firstIp.trim();
    }
    return req.ip ?? '';
  }
}
