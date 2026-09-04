import {
  Injectable,
  Inject,
  Logger,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DRIZZLE_DATABASE, type PostgresJsDatabase } from '@lark-apaas/fullstack-nestjs-core';
import { inquiries, pageViews, clickEvents, sessions } from '@server/database/schema';
import { eq, and, count, desc, ilike, or, gte, sql } from 'drizzle-orm';
import type {
  Inquiry,
  InquiryListResponse,
  InquiryListParams,
  UpdateInquiryRequest,
  CreateInquiryRequest,
  UserJourneySession,
  UserJourneyStep,
} from '@shared/api.interface';
import { parseUserAgent } from '@server/common/utils/ua-parser';
import type { UTMCookieParams } from '@server/common/utils/cookie-helper';

@Injectable()
export class InquiriesService {
  private readonly logger = new Logger(InquiriesService.name);

  constructor(@Inject(DRIZZLE_DATABASE) private readonly db: PostgresJsDatabase) {}

  private mapToInquiry(row: Record<string, unknown>): Inquiry {
    return {
      id: row.id as string,
      name: row.name as string,
      company: (row.company as string) ?? undefined,
      email: row.email as string,
      phone: (row.phone as string) ?? undefined,
      whatsapp: (row.whatsapp as string) ?? undefined,
      country: (row.country as string) ?? undefined,
      productId: (row.productId as string) ?? undefined,
      productName: (row.productName as string) ?? undefined,
      quantity: row.quantity !== undefined && row.quantity !== null ? (row.quantity as number) : undefined,
      message: (row.message as string) ?? undefined,
      utmSource: (row.utmSource as string) ?? undefined,
      utmMedium: (row.utmMedium as string) ?? undefined,
      utmCampaign: (row.utmCampaign as string) ?? undefined,
      utmTerm: (row.utmTerm as string) ?? undefined,
      utmContent: (row.utmContent as string) ?? undefined,
      referrer: (row.referrer as string) ?? undefined,
      ip: (row.ip as string) ?? undefined,
      userAgent: (row.userAgent as string) ?? undefined,
      device: (row.device as string) ?? undefined,
      browser: (row.browser as string) ?? undefined,
      os: (row.os as string) ?? undefined,
      countryGuess: (row.countryGuess as string) ?? undefined,
      status: (row.status as string) as Inquiry['status'],
      notes: (row.notes as string) ?? undefined,
      createdAt: (row.createdAt as Date).toISOString(),
      updatedAt: (row.updatedAt as Date).toISOString(),
    };
  }

  async createInquiry(
    dto: CreateInquiryRequest,
    utmParams: UTMCookieParams,
    sessionId: string | undefined,
    ip: string,
    userAgent: string,
    referrer: string | undefined,
  ): Promise<Inquiry> {
    if (!dto.name || !dto.email) {
      throw new BadRequestException('姓名和邮箱为必填项');
    }

    // Rate limiting: max 5 per IP in 10 minutes
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const rateLimitResult = await this.db
      .select({ count: count() })
      .from(inquiries)
      .where(and(eq(inquiries.ip, ip), gte(inquiries.createdAt, tenMinutesAgo)));

    const recentCount = Number(rateLimitResult[0]?.count ?? 0);
    if (recentCount >= 5) {
      throw new ConflictException('提交过于频繁，请稍后再试');
    }

    const uaInfo = parseUserAgent(userAgent);

    try {
      const insertData: Record<string, unknown> = {
        name: dto.name,
        email: dto.email,
        company: dto.company,
        phone: dto.phone,
        whatsapp: dto.whatsapp,
        country: dto.country,
        productId: dto.productId,
        productName: dto.productName,
        quantity: dto.quantity,
        message: dto.message,
        utmSource: utmParams.utmSource,
        utmMedium: utmParams.utmMedium,
        utmCampaign: utmParams.utmCampaign,
        utmTerm: utmParams.utmTerm,
        utmContent: utmParams.utmContent,
        referrer: referrer,
        ip: ip,
        userAgent: userAgent,
        device: uaInfo.device,
        browser: uaInfo.browser,
        os: uaInfo.os,
        status: 'new',
      };

      const rows = await this.db.insert(inquiries).values(insertData as never).returning();
      const result = this.mapToInquiry(rows[0]);

      this.logger.log(`新询盘提交: id=${result.id}, email=${result.email}, ip=${ip}`);
      void sessionId; // sessionId 可用于关联分析，此处保留接口
      return result;
    } catch (error) {
      this.logger.error(`提交询盘失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  // Admin methods
  async getInquiryList(params: InquiryListParams): Promise<InquiryListResponse> {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;
    const offset = (page - 1) * pageSize;

    const conditions = [];
    if (params.status) {
      conditions.push(eq(inquiries.status, params.status));
    }
    if (params.utmSource) {
      conditions.push(eq(inquiries.utmSource, params.utmSource));
    }
    if (params.country) {
      conditions.push(eq(inquiries.country, params.country));
    }
    if (params.productId) {
      conditions.push(eq(inquiries.productId, params.productId));
    }
    if (params.dateFrom) {
      conditions.push(gte(inquiries.createdAt, new Date(params.dateFrom)));
    }
    if (params.dateTo) {
      const endDate = new Date(params.dateTo);
      endDate.setHours(23, 59, 59, 999);
      conditions.push(sql`${inquiries.createdAt} <= ${endDate.toISOString()}`);
    }
    if (params.search) {
      const searchTerm = `%${params.search}%`;
      conditions.push(
        or(
          ilike(inquiries.name, searchTerm),
          ilike(inquiries.email, searchTerm),
          ilike(inquiries.company, searchTerm),
          ilike(inquiries.productName, searchTerm),
        ),
      );
    }

    try {
      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
      const countQuery = this.db.select({ count: count() }).from(inquiries);
      const listQuery = this.db
        .select()
        .from(inquiries)
        .orderBy(desc(inquiries.createdAt))
        .limit(pageSize)
        .offset(offset);

      const [countResult, rows] = await Promise.all([
        whereClause ? countQuery.where(whereClause) : countQuery,
        whereClause ? listQuery.where(whereClause) : listQuery,
      ]);

      const total = Number(countResult[0]?.count ?? 0);
      const items: Inquiry[] = rows.map((row) => this.mapToInquiry(row));

      return { items, total, page, pageSize };
    } catch (error) {
      this.logger.error(`获取询盘列表失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async getInquiryDetail(id: string): Promise<Inquiry & { journey: UserJourneySession[] }> {
    try {
      const rows = await this.db.select().from(inquiries).where(eq(inquiries.id, id));
      if (rows.length === 0) {
        throw new NotFoundException('询盘不存在');
      }

      const inquiry = this.mapToInquiry(rows[0]);

      // Find related sessions by email-matched sessions or recent page views
      const journey: UserJourneySession[] = [];
      if (inquiry.ip) {
        // Find sessions from same IP around the inquiry time
        const relatedSessions = await this.db
          .select()
          .from(sessions)
          .where(eq(sessions.ip, inquiry.ip))
          .orderBy(desc(sessions.lastVisitAt))
          .limit(5);

        for (const sess of relatedSessions) {
          const [pvRows, clickRows] = await Promise.all([
            this.db
              .select()
              .from(pageViews)
              .where(eq(pageViews.sessionId, sess.sessionId))
              .orderBy(desc(pageViews.createdAt))
              .limit(50),
            this.db
              .select()
              .from(clickEvents)
              .where(eq(clickEvents.sessionId, sess.sessionId))
              .orderBy(desc(clickEvents.createdAt))
              .limit(50),
          ]);

          const steps: UserJourneyStep[] = [];
          for (const pv of pvRows) {
            steps.push({
              type: 'page_view',
              url: pv.url,
              pageTitle: pv.pageTitle ?? undefined,
              timestamp: pv.createdAt.toISOString(),
            });
          }
          for (const ce of clickRows) {
            steps.push({
              type: 'click',
              url: ce.pageUrl ?? '',
              elementText: ce.elementText ?? undefined,
              elementType: ce.elementType ?? undefined,
              timestamp: ce.createdAt.toISOString(),
            });
          }
          steps.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

          journey.push({
            sessionId: sess.sessionId,
            userFingerprint: sess.userFingerprint ?? '',
            firstVisitAt: sess.firstVisitAt.toISOString(),
            lastVisitAt: sess.lastVisitAt.toISOString(),
            pageCount: sess.pageCount ?? 0,
            device: sess.device ?? '',
            countryGuess: sess.countryGuess ?? '',
            utmSource: sess.utmSource ?? '',
            steps,
          });
        }
      }

      return { ...inquiry, journey };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`获取询盘详情失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async updateInquiry(id: string, dto: UpdateInquiryRequest): Promise<Inquiry> {
    try {
      const patch: Partial<typeof inquiries.$inferInsert> = {};
      if (dto.status !== undefined) patch.status = dto.status;
      if (dto.notes !== undefined) patch.notes = dto.notes;
      if (Object.keys(patch).length === 0) {
        throw new BadRequestException('未提供可更新字段');
      }
      (patch as { updatedAt: Date }).updatedAt = new Date();

      const rows = await this.db
        .update(inquiries)
        .set(patch)
        .where(eq(inquiries.id, id))
        .returning();

      if (rows.length === 0) {
        throw new NotFoundException('询盘不存在');
      }

      return this.mapToInquiry(rows[0]);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      this.logger.error(`更新询盘失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async exportCsv(params: InquiryListParams): Promise<string> {
    const allParams: InquiryListParams = { ...params, page: 1, pageSize: 10000 };
    const { items } = await this.getInquiryList(allParams);

    const headers = [
      'ID', '姓名', '公司', '邮箱', '电话', 'WhatsApp', '国家',
      '产品ID', '产品名称', '数量', '留言',
      'UTM Source', 'UTM Medium', 'UTM Campaign',
      'IP', '设备', '浏览器', '操作系统', '国家(猜测)',
      '状态', '备注', '创建时间',
    ];

    const csvRows = [headers.join(',')];
    for (const item of items) {
      const row = [
        item.id,
        this.escapeCsv(item.name),
        this.escapeCsv(item.company ?? ''),
        this.escapeCsv(item.email),
        this.escapeCsv(item.phone ?? ''),
        this.escapeCsv(item.whatsapp ?? ''),
        this.escapeCsv(item.country ?? ''),
        item.productId ?? '',
        this.escapeCsv(item.productName ?? ''),
        item.quantity ?? '',
        this.escapeCsv(item.message ?? ''),
        item.utmSource ?? '',
        item.utmMedium ?? '',
        item.utmCampaign ?? '',
        item.ip ?? '',
        item.device ?? '',
        item.browser ?? '',
        item.os ?? '',
        item.countryGuess ?? '',
        item.status,
        this.escapeCsv(item.notes ?? ''),
        item.createdAt,
      ];
      csvRows.push(row.join(','));
    }

    return csvRows.join('\n');
  }

  private escapeCsv(value: string): string {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }
}
