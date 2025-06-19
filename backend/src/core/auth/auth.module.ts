import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthUtils } from './auth.utils';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';
import { AccountService } from '../account/account.service';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token';

@Module({
  imports: [JwtModule.register({ global: true }), AccountModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthUtils,
    UserService,
    AccountService,
    JwtStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
