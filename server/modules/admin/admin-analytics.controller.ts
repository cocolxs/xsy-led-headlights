import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminAnalyticsService } from './admin-analytics.service';
import type {
  RealtimeStats,
  PagePerformanceItem,
  CountryStatItem,
  DeviceOsStatItem,
  AnalyticsListParams,
  PageViewDetail,
} from '@shared/api.interface';

@Controller('api/admin/analytics')
@UseGuards(AdminAuthGuard)
export class AdminAnalyticsController {
  constructor(private readonly analyticsService: AdminAnalyticsService) {}

  @Get('realtime')
  async getRealtime(): Promise<RealtimeStats> {
    return this.analyticsService.getRealtimeStats();
  }

  @Get('page-views')
  async getPageViews(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ): Promise<{ items: PageViewDetail[]; total: number; page: number; pageSize: number }> {
    const params: AnalyticsListParams = {
      dateFrom,
      dateTo,
      page: page ? parseInt(page, 10) : undefined,
      pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
    };
    return this.analyticsService.getPageViewList(params);
  }

  @Get('page-performance')
  async getPagePerformance(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ): Promise<PagePerformanceItem[]> {
    return this.analyticsService.getPagePerformance(dateFrom, dateTo);
  }

  @Get('country-stats')
  async getCountryStats(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ): Promise<CountryStatItem[]> {
    return this.analyticsService.getCountryStats(dateFrom, dateTo);
  }

  @Get('device-stats')
  async getDeviceStats(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ): Promise<DeviceOsStatItem[]> {
    return this.analyticsService.getDeviceStats(dateFrom, dateTo);
  }

  @Get('browser-stats')
  async getBrowserStats(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ): Promise<DeviceOsStatItem[]> {
    return this.analyticsService.getBrowserStats(dateFrom, dateTo);
  }

  @Get('os-stats')
  async getOsStats(
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ): Promise<DeviceOsStatItem[]> {
    return this.analyticsService.getOsStats(dateFrom, dateTo);
  }
}
