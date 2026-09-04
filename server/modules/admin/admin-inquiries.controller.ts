import { Controller, Get, Put, Param, Body, Query, UseGuards, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AdminAuthGuard } from './admin-auth.guard';
import { InquiriesService } from '@server/modules/inquiries/inquiries.service';
import type {
  InquiryListParams,
  InquiryListResponse,
  UpdateInquiryRequest,
  UserJourneySession,
  Inquiry,
} from '@shared/api.interface';

@Controller('api/admin/inquiries')
@UseGuards(AdminAuthGuard)
export class AdminInquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Get()
  async getList(
    @Query('status') status?: string,
    @Query('utmSource') utmSource?: string,
    @Query('country') country?: string,
    @Query('productId') productId?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ): Promise<InquiryListResponse> {
    const params: InquiryListParams = {
      status: status as InquiryListParams['status'],
      utmSource,
      country,
      productId,
      dateFrom,
      dateTo,
      search,
      page: page ? parseInt(page, 10) : undefined,
      pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
    };
    return this.inquiriesService.getInquiryList(params);
  }

  @Get('export')
  async exportCsv(
    @Query('status') status?: string,
    @Query('utmSource') utmSource?: string,
    @Query('country') country?: string,
    @Query('productId') productId?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('search') search?: string,
    @Res() res?: Response,
  ): Promise<void> {
    const params: InquiryListParams = {
      status: status as InquiryListParams['status'],
      utmSource,
      country,
      productId,
      dateFrom,
      dateTo,
      search,
    };
    const csv = await this.inquiriesService.exportCsv(params);
    if (res) {
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="inquiries.csv"');
      res.send('\uFEFF' + csv);
    }
  }

  @Get(':id')
  async getDetail(@Param('id') id: string): Promise<Inquiry & { journey: UserJourneySession[] }> {
    return this.inquiriesService.getInquiryDetail(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateInquiryRequest,
  ): Promise<Inquiry> {
    return this.inquiriesService.updateInquiry(id, dto);
  }
}
