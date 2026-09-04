import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly authService: AdminAuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader: string | undefined = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('未提供认证令牌');
    }

    const token = authHeader.slice(7);
    const session = this.authService.validateToken(token);

    if (!session) {
      throw new UnauthorizedException('令牌无效或已过期');
    }

    request.admin = session;
    return true;
  }
}
