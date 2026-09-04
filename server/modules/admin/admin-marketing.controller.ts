import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminMarketingService } from './admin-marketing.service';
import type { MarketingAnalyticsResponse, MarketingAnalyticsParams } from '@shared/api.interface';

@Controller('api/admin/marketing')
@UseGuards(AdminAuthGuard)
export class AdminMarketingController {
  constructor(private readonly marketingService: AdminMarketingService) {}

  @Get()
  async getAnalytics(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('period') period?: 'today' | '7d' | '30d' | 'custom',
  ): Promise<MarketingAnalyticsResponse> {
    const params: MarketingAnalyticsParams = { dateFrom, dateTo, period };
    return this.marketingService.getMarketingAnalytics(params);
  }
}
