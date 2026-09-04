import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common';
import { DRIZZLE_DATABASE, type PostgresJsDatabase } from '@lark-apaas/fullstack-nestjs-core';
import { products } from '@server/database/schema';
import { eq, and, count, desc, asc, ilike, or } from 'drizzle-orm';
import type { Product, ProductListResponse, ProductListParams } from '@shared/api.interface';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(@Inject(DRIZZLE_DATABASE) private readonly db: PostgresJsDatabase) {}

  private mapToProduct(row: Record<string, unknown>): Product {
    return {
      id: row.id as string,
      name: row.name as string,
      nameEn: (row.nameEn as string) ?? undefined,
      model: row.model as string,
      socketType: row.socketType as string,
      powerW: row.powerW as number,
      lumen: row.lumen as number,
      colorTempK: row.colorTempK as number,
      voltage: row.voltage as string,
      ipRate: row.ipRate as string,
      lifespanHours: row.lifespanHours as number,
      material: row.material as string,
      description: (row.description as string) ?? undefined,
      descriptionEn: (row.descriptionEn as string) ?? undefined,
      features: (row.features as string[]) ?? [],
      images: (row.images as string[]) ?? [],
      moq: row.moq as number,
      packaging: (row.packaging as string) ?? undefined,
      deliveryTime: (row.deliveryTime as string) ?? undefined,
      warranty: row.warranty as string,
      priceRange: (row.priceRange as string) ?? undefined,
      sortOrder: row.sortOrder as number,
      isActive: row.isActive as boolean,
      createdAt: (row.createdAt as Date).toISOString(),
      updatedAt: (row.updatedAt as Date).toISOString(),
    };
  }

  async getPublicList(params: ProductListParams): Promise<ProductListResponse> {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 12;
    const offset = (page - 1) * pageSize;

    const conditions = [eq(products.isActive, true)];
    if (params.socketType) {
      conditions.push(eq(products.socketType, params.socketType));
    }

    try {
      const [countResult, rows] = await Promise.all([
        this.db
          .select({ count: count() })
          .from(products)
          .where(and(...conditions)),
        this.db
          .select()
          .from(products)
          .where(and(...conditions))
          .orderBy(asc(products.sortOrder), desc(products.createdAt))
          .limit(pageSize)
          .offset(offset),
      ]);

      const total = Number(countResult[0]?.count ?? 0);
      const items: Product[] = rows.map((row) => this.mapToProduct(row));

      return { items, total, page, pageSize };
    } catch (error) {
      this.logger.error(`获取产品列表失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async getPublicDetail(id: string): Promise<Product> {
    try {
      const rows = await this.db
        .select()
        .from(products)
        .where(and(eq(products.id, id), eq(products.isActive, true)));

      if (rows.length === 0) {
        throw new NotFoundException('产品不存在或已下架');
      }

      return this.mapToProduct(rows[0]);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`获取产品详情失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  // Admin methods
  async getAdminList(params: ProductListParams & { search?: string }): Promise<ProductListResponse> {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;
    const offset = (page - 1) * pageSize;

    const conditions = [];
    if (params.socketType) {
      conditions.push(eq(products.socketType, params.socketType));
    }
    if (params.search) {
      const searchTerm = `%${params.search}%`;
      conditions.push(
        or(
          ilike(products.name, searchTerm),
          ilike(products.nameEn, searchTerm),
          ilike(products.model, searchTerm),
        ),
      );
    }

    try {
      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
      const countQuery = this.db.select({ count: count() }).from(products);
      const listQuery = this.db
        .select()
        .from(products)
        .orderBy(asc(products.sortOrder), desc(products.createdAt))
        .limit(pageSize)
        .offset(offset);

      const [countResult, rows] = await Promise.all([
        whereClause ? countQuery.where(whereClause) : countQuery,
        whereClause ? listQuery.where(whereClause) : listQuery,
      ]);

      const total = Number(countResult[0]?.count ?? 0);
      const items: Product[] = rows.map((row) => this.mapToProduct(row));

      return { items, total, page, pageSize };
    } catch (error) {
      this.logger.error(`获取管理后台产品列表失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async createProduct(data: Record<string, unknown>): Promise<Product> {
    try {
      const rows = await this.db.insert(products).values(data as never).returning();
      return this.mapToProduct(rows[0]);
    } catch (error) {
      this.logger.error(`创建产品失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async updateProduct(id: string, data: Record<string, unknown>): Promise<Product> {
    try {
      const patch: Partial<typeof products.$inferInsert> = {};
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          (patch as Record<string, unknown>)[key] = value;
        }
      }
      if (Object.keys(patch).length === 0) {
        throw new NotFoundException('未提供可更新字段');
      }
      (patch as { updatedAt: Date }).updatedAt = new Date();

      const rows = await this.db
        .update(products)
        .set(patch)
        .where(eq(products.id, id))
        .returning();

      if (rows.length === 0) {
        throw new NotFoundException('产品不存在');
      }

      return this.mapToProduct(rows[0]);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`更新产品失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const rows = await this.db.delete(products).where(eq(products.id, id)).returning({ id: products.id });
      if (rows.length === 0) {
        throw new NotFoundException('产品不存在');
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`删除产品失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async toggleProduct(id: string): Promise<Product> {
    try {
      const existing = await this.db.select().from(products).where(eq(products.id, id));
      if (existing.length === 0) {
        throw new NotFoundException('产品不存在');
      }

      const newIsActive = !existing[0].isActive;
      const rows = await this.db
        .update(products)
        .set({ isActive: newIsActive, updatedAt: new Date() })
        .where(eq(products.id, id))
        .returning();

      return this.mapToProduct(rows[0]);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`切换产品状态失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async getAdminDetail(id: string): Promise<Product> {
    try {
      const rows = await this.db.select().from(products).where(eq(products.id, id));
      if (rows.length === 0) {
        throw new NotFoundException('产品不存在');
      }
      return this.mapToProduct(rows[0]);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`获取产品详情失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }
}
