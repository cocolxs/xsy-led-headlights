import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import type { Product, ProductListResponse, ProductListParams } from '@shared/api.interface';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getList(
    @Query('socketType') socketType?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ): Promise<ProductListResponse> {
    const params: ProductListParams = {
      socketType,
      page: page ? parseInt(page, 10) : undefined,
      pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
    };
    return this.productsService.getPublicList(params);
  }

  @Get(':id')
  async getDetail(@Param('id') id: string): Promise<Product> {
    return this.productsService.getPublicDetail(id);
  }
}
