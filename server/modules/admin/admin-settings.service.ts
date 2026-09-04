import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common';
import { DRIZZLE_DATABASE, type PostgresJsDatabase } from '@lark-apaas/fullstack-nestjs-core';
import { siteSettings } from '@server/database/schema';
import { eq } from 'drizzle-orm';
import type { SiteSettings } from '@shared/api.interface';

const SETTING_KEYS: (keyof SiteSettings)[] = [
  'companyName',
  'companyNameEn',
  'address',
  'email',
  'phone',
  'whatsapp',
  'workingHours',
  'seoTitle',
  'seoDescription',
  'seoKeywords',
  'ga4Id',
  'gtmId',
  'facebookPixelId',
  'googleAdsId',
  'notificationEmail',
];

const CAMEL_TO_SNAKE: Record<keyof SiteSettings, string> = {
  companyName: 'company_name',
  companyNameEn: 'company_name_en',
  address: 'address',
  email: 'email',
  phone: 'phone',
  whatsapp: 'whatsapp',
  workingHours: 'working_hours',
  seoTitle: 'seo_title',
  seoDescription: 'seo_description',
  seoKeywords: 'seo_keywords',
  ga4Id: 'ga4_id',
  gtmId: 'gtm_id',
  facebookPixelId: 'facebook_pixel_id',
  googleAdsId: 'google_ads_id',
  notificationEmail: 'notification_email',
};

const SNAKE_TO_CAMEL: Record<string, keyof SiteSettings> = {};
for (const [camel, snake] of Object.entries(CAMEL_TO_SNAKE)) {
  SNAKE_TO_CAMEL[snake] = camel as keyof SiteSettings;
}

const PUBLIC_SETTING_KEYS: (keyof SiteSettings)[] = [
  'companyName',
  'companyNameEn',
  'address',
  'email',
  'phone',
  'whatsapp',
  'workingHours',
  'seoTitle',
  'seoDescription',
  'seoKeywords',
  'ga4Id',
  'gtmId',
  'facebookPixelId',
  'googleAdsId',
];

@Injectable()
export class AdminSettingsService {
  private readonly logger = new Logger(AdminSettingsService.name);

  constructor(@Inject(DRIZZLE_DATABASE) private readonly db: PostgresJsDatabase) {}

  async getAllSettings(): Promise<SiteSettings> {
    try {
      const rows = await this.db.select().from(siteSettings);
      const settingsMap = new Map<string, string>();
      for (const row of rows) {
        settingsMap.set(row.settingKey, row.settingValue ?? '');
      }

      const result = {} as Record<string, string>;
      for (const key of SETTING_KEYS) {
        const snakeKey = CAMEL_TO_SNAKE[key];
        result[key] = settingsMap.get(snakeKey) ?? '';
      }
      return result as unknown as SiteSettings;
    } catch (error) {
      this.logger.error(`获取站点设置失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async getPublicSettings(): Promise<Partial<SiteSettings>> {
    try {
      const allSettings = await this.getAllSettings();
      const result: Record<string, string> = {};
      for (const key of PUBLIC_SETTING_KEYS) {
        result[key] = allSettings[key];
      }
      return result as unknown as Partial<SiteSettings>;
    } catch (error) {
      this.logger.error(`获取公开设置失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    try {
      for (const [camelKey, value] of Object.entries(settings)) {
        const snakeKey = CAMEL_TO_SNAKE[camelKey as keyof SiteSettings];
        if (!snakeKey) continue;

        // Upsert: update if exists, insert if not
        const existing = await this.db
          .select()
          .from(siteSettings)
          .where(eq(siteSettings.settingKey, snakeKey));

        if (existing.length > 0) {
          await this.db
            .update(siteSettings)
            .set({ settingValue: String(value) })
            .where(eq(siteSettings.settingKey, snakeKey));
        } else {
          await this.db.insert(siteSettings).values({
            settingKey: snakeKey,
            settingValue: String(value),
          } as never);
        }
      }

      return this.getAllSettings();
    } catch (error) {
      this.logger.error(`更新站点设置失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }
}
