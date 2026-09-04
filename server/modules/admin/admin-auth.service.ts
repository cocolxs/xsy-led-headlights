import { Injectable, Inject, Logger, UnauthorizedException } from '@nestjs/common';
import { DRIZZLE_DATABASE, type PostgresJsDatabase } from '@lark-apaas/fullstack-nestjs-core';
import { admins } from '@server/database/schema';
import { eq } from 'drizzle-orm';
import { SHA256 } from 'crypto-js';
import { randomBytes } from 'crypto';

interface AdminSession {
  adminId: string;
  username: string;
  name: string;
  role: string;
  mustChangePassword: boolean;
  expiresAt: Date;
}

@Injectable()
export class AdminAuthService {
  private readonly logger = new Logger(AdminAuthService.name);
  private readonly tokenStore = new Map<string, AdminSession>();
  private readonly TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

  constructor(@Inject(DRIZZLE_DATABASE) private readonly db: PostgresJsDatabase) {}

  async login(username: string, password: string): Promise<{ token: string; admin: AdminSession }> {
    try {
      const rows = await this.db.select().from(admins).where(eq(admins.username, username));
      if (rows.length === 0) {
        throw new UnauthorizedException('用户名或密码错误');
      }

      const admin = rows[0];
      const hashedPassword = SHA256(password).toString();

      if (hashedPassword !== admin.passwordHash) {
        throw new UnauthorizedException('用户名或密码错误');
      }

      // Update last login
      await this.db
        .update(admins)
        .set({ lastLogin: new Date() })
        .where(eq(admins.id, admin.id));

      // Generate token
      const token = randomBytes(32).toString('hex');
      const session: AdminSession = {
        adminId: admin.id,
        username: admin.username,
        name: admin.name ?? '',
        role: admin.role ?? 'admin',
        mustChangePassword: admin.mustChangePassword ?? false,
        expiresAt: new Date(Date.now() + this.TOKEN_TTL_MS),
      };

      this.tokenStore.set(token, session);
      this.logger.log(`管理员登录成功: username=${username}`);

      return { token, admin: session };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      this.logger.error(`管理员登录失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  validateToken(token: string): AdminSession | null {
    const session = this.tokenStore.get(token);
    if (!session) return null;
    if (session.expiresAt.getTime() < Date.now()) {
      this.tokenStore.delete(token);
      return null;
    }
    return session;
  }

  async changePassword(adminId: string, oldPassword: string, newPassword: string): Promise<void> {
    try {
      const rows = await this.db.select().from(admins).where(eq(admins.id, adminId));
      if (rows.length === 0) {
        throw new UnauthorizedException('管理员不存在');
      }

      const admin = rows[0];
      const oldHashed = SHA256(oldPassword).toString();
      if (oldHashed !== admin.passwordHash) {
        throw new UnauthorizedException('原密码错误');
      }

      const newHashed = SHA256(newPassword).toString();
      await this.db
        .update(admins)
        .set({ passwordHash: newHashed, mustChangePassword: false, updatedAt: new Date() })
        .where(eq(admins.id, adminId));

      this.logger.log(`管理员密码修改成功: adminId=${adminId}`);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      this.logger.error(`修改密码失败: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  // Cleanup expired tokens periodically (called lazily on each login)
  cleanupExpired(): void {
    const now = Date.now();
    for (const [token, session] of this.tokenStore.entries()) {
      if (session.expiresAt.getTime() < now) {
        this.tokenStore.delete(token);
      }
    }
  }
}
