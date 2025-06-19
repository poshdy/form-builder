import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserTokenPayload } from 'src/core/types';

export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          if (request && request.cookies) {
            const refreshToken = request.cookies['refresh-token'];
            if (refreshToken) {
              return refreshToken;
            }
          }
          return null;
        },
      ]),
    });
  }

  validate(request: Request, payload: UserTokenPayload): unknown {
    const refreshToken = request?.cookies['refresh-token'];
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }
    return {
      refreshToken,
      ...payload,
    };
  }
}
