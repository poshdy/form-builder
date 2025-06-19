import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class AuthUtils {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return await compare(value, hashedValue);
  }
  async hash(value: string): Promise<string> {
    return await hash(value, 12);
  }
  async generateToken(payload: Record<string, string>, expiresIn: string) {
    const withoutExp = {
      accountId: payload.accountId,
      userId: payload.userId,
      email: payload.email,
    };
    return this.jwtService.sign(withoutExp, {
      secret: this.configService.get('auth.accessTokenSecret'),
      expiresIn,
    });
  }
  async verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get('auth.accessTokenSecret'),
    });
  }
}
