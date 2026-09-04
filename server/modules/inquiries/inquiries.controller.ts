import { Controller, Post, Body, Req, Headers } from '@nestjs/common';
import type { Request } from 'express';
import { InquiriesService } from './inquiries.service';
import type { CreateInquiryRequest, Inquiry } from '@shared/api.interface';
import { parseUTMFromCookies, getSessionIdFromCookies } from '@server/common/utils/cookie-helper';

@Controller('api/inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  async createInquiry(
    @Body() dto: CreateInquiryRequest,
    @Req() req: Request,
    @Headers('referer') referer?: string,
    @Headers('user-agent') userAgent?: string,
  ): Promise<Inquiry> {
    const cookieHeader = req.headers.cookie;
    const utmParams = parseUTMFromCookies(cookieHeader);
    const sessionId = getSessionIdFromCookies(cookieHeader);
    const ip = this.getClientIp(req);

    return this.inquiriesService.createInquiry(
      dto,
      utmParams,
      sessionId,
      ip,
      userAgent ?? '',
      referer,
    );
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
