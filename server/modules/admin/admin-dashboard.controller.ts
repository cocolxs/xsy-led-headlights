import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminDashboardService } from './admin-dashboard.service';
import type { DashboardResponse } from '@shared/api.interface';

@Controller('api/admin/dashboard')
@UseGuards(AdminAuthGuard)
export class AdminDashboardController {
  constructor(private readonly dashboardService: AdminDashboardService) {}

  @Get()
  async getDashboard(): Promise<DashboardResponse> {
    return this.dashboardService.getDashboard();
  }
}
