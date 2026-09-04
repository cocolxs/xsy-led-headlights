import { Controller, Get } from '@nestjs/common';
import { AdminSettingsService } from './admin-settings.service';
import type { SiteSettings } from '@shared/api.interface';

@Controller('api/settings')
export class PublicSettingsController {
  constructor(private readonly settingsService: AdminSettingsService) {}

  @Get('public')
  async getPublicSettings(): Promise<Partial<SiteSettings>> {
    return this.settingsService.getPublicSettings();
  }
}
