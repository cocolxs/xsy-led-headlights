import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { PlatformModule } from '@lark-apaas/fullstack-nestjs-core';

import { GlobalExceptionFilter } from './common/filters/exception.filter';
import { ViewModule } from './modules/view/view.module';
import { ProductsModule } from './modules/products/products.module';
import { InquiriesModule } from './modules/inquiries/inquiries.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    PlatformModule.forRoot(),
    ProductsModule,
    InquiriesModule,
    TrackingModule,
    AdminModule,
    ViewModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
