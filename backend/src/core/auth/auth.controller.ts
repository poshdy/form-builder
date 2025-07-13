import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginPayload, loginSchema, signUpPayload, signUpSchema } from './dto';
import { ZodValidationPipe } from 'src/lib/zod-pipe';
import { CookieOptions, Response } from 'express';
import { RefreshTokenGuard, AuthenticationGuard } from './guards';
import { User } from './decorators/user.decorator';
import { UserTokenPayload } from '../types';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  cookieOptions: CookieOptions = {
    httpOnly: true,
    path: '/',
    maxAge: 259200000,
  };

  @UsePipes(new ZodValidationPipe(signUpSchema))
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(
    @Body()
    payload: signUpPayload,
    @Res() response: Response,
  ) {
    const res = await this.authService.signUp(payload);

    response.cookie('access-token', res.accessToken, this.cookieOptions);
    response.cookie('refresh-token', res.refreshToken, this.cookieOptions);

    const { refreshToken, ...rest } = res;
    response.json({ data: { ...rest } });
  }
  @UsePipes(new ZodValidationPipe(loginSchema))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body()
    payload: loginPayload,
    @Res() response: Response,
  ) {
    const res = await this.authService.login(payload);

    response.cookie('access-token', res.accessToken, this.cookieOptions);
    response.cookie('refresh-token', res.refreshToken, this.cookieOptions);

    return response.json({ data: res });
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get('refresh-token')
  async refreshToken(
    @User() user: UserTokenPayload,
    @Res() response: Response,
  ) {
    const res = await this.authService.refreshToken(user);

    response.clearCookie('session-token');
    response.clearCookie('refresh-token');

    response.cookie('access-token', res.accessToken, this.cookieOptions);
    response.cookie('refresh-token', res.refreshToken, this.cookieOptions);
    response.json({ accessToken: res.accessToken });
  }

  @UseGuards(AuthenticationGuard)
  @HttpCode(HttpStatus.OK)
  @Get('logout')
  async logout(@User() user: UserTokenPayload, @Res() response: Response) {
    await this.authService.logout(user);
    response.clearCookie('session-token');
    response.clearCookie('refresh-token');
    response.json({ message: 'logged out successfully' });
  }
}
