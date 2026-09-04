import { Controller, Get, Post, Put, Delete, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from './admin-auth.guard';
import { ProductsService } from '@server/modules/products/products.service';
import type { Product, ProductListResponse } from '@shared/api.interface';

@Controller('api/admin/products')
@UseGuards(AdminAuthGuard)
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getList(
    @Query('socketType') socketType?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ): Promise<ProductListResponse> {
    return this.productsService.getAdminList({
      socketType,
      search,
      page: page ? parseInt(page, 10) : undefined,
      pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
    });
  }

  @Post()
  async create(@Body() body: Record<string, unknown>): Promise<Product> {
    return this.productsService.createProduct(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Record<string, unknown>): Promise<Product> {
    return this.productsService.updateProduct(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ success: boolean }> {
    await this.productsService.deleteProduct(id);
    return { success: true };
  }

  @Patch(':id/toggle')
  async toggle(@Param('id') id: string): Promise<Product> {
    return this.productsService.toggleProduct(id);
  }
}
