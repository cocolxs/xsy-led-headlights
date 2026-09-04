import { Module, forwardRef } from '@nestjs/common';
import { ProductsModule } from '@server/modules/products/products.module';
import { InquiriesModule } from '@server/modules/inquiries/inquiries.module';

import { AdminAuthService } from './admin-auth.service';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminDashboardService } from './admin-dashboard.service';
import { AdminSettingsService } from './admin-settings.service';
import { AdminAnalyticsService } from './admin-analytics.service';
import { AdminMarketingService } from './admin-marketing.service';

import { AdminAuthController } from './admin-auth.controller';
import { AdminDashboardController } from './admin-dashboard.controller';
import { AdminInquiriesController } from './admin-inquiries.controller';
import { AdminProductsController } from './admin-products.controller';
import { AdminAnalyticsController } from './admin-analytics.controller';
import { AdminMarketingController } from './admin-marketing.controller';
import { AdminSettingsController } from './admin-settings.controller';
import { PublicSettingsController } from './public-settings.controller';

@Module({
  imports: [forwardRef(() => ProductsModule), forwardRef(() => InquiriesModule)],
  controllers: [
    AdminAuthController,
    AdminDashboardController,
    AdminInquiriesController,
    AdminProductsController,
    AdminAnalyticsController,
    AdminMarketingController,
    AdminSettingsController,
    PublicSettingsController,
  ],
  providers: [
    AdminAuthService,
    AdminAuthGuard,
    AdminDashboardService,
    AdminSettingsService,
    AdminAnalyticsService,
    AdminMarketingService,
  ],
  exports: [AdminAuthService],
})
export class AdminModule {}
