import { Controller, Post, Body, UseGuards, Req, Put } from '@nestjs/common';
import type { Request } from 'express';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthGuard } from './admin-auth.guard';
import type { AdminLoginRequest, AdminLoginResponse, ChangePasswordRequest } from '@shared/api.interface';

@Controller('api/admin')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @Post('login')
  async login(@Body() dto: AdminLoginRequest): Promise<AdminLoginResponse> {
    const { token, admin } = await this.authService.login(dto.username, dto.password);
    return {
      token,
      admin: {
        id: admin.adminId,
        username: admin.username,
        name: admin.name,
        role: admin.role,
        mustChangePassword: admin.mustChangePassword,
      },
    };
  }

  @UseGuards(AdminAuthGuard)
  @Put('change-password')
  async changePassword(
    @Body() dto: ChangePasswordRequest,
    @Req() req: Request & { admin: { adminId: string } },
  ): Promise<{ success: boolean }> {
    await this.authService.changePassword(req.admin.adminId, dto.oldPassword, dto.newPassword);
    return { success: true };
  }
}
