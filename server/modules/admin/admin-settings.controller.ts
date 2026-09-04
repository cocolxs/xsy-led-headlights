import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminSettingsService } from './admin-settings.service';
import type { SiteSettings } from '@shared/api.interface';

@Controller('api/admin/settings')
@UseGuards(AdminAuthGuard)
export class AdminSettingsController {
  constructor(private readonly settingsService: AdminSettingsService) {}

  @Get()
  async getSettings(): Promise<SiteSettings> {
    return this.settingsService.getAllSettings();
  }

  @Put()
  async updateSettings(@Body() settings: Partial<SiteSettings>): Promise<SiteSettings> {
    return this.settingsService.updateSettings(settings);
  }
}
