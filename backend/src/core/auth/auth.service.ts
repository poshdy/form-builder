import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { loginPayload, signUpPayload } from './dto';
import { AccountService } from '../account/account.service';
import { UserService } from 'src/user/user.service';
import { AuthUtils } from './auth.utils';
import { UserTokenPayload } from '../types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly accountService: AccountService,
    private readonly authUtils: AuthUtils,
  ) {}
  async signUp(payload: signUpPayload) {
    const account = await this.accountService.getOne(payload.email);

    if (account) {
      throw new BadRequestException('this email is taken try another one');
    }

    const { firstName, lastName, email, password } = payload;
    const user = await this.userService.createUser({
      firstName,
      lastName,
    });

    const hashedPassword = await this.authUtils.hash(password);

    const acc = await this.accountService.createAccount({
      userId: user.id,
      email,
      hashedPassword,
    });

    const tokenPayload = {
      email,
      userId: user.id,
      accountId: acc.id,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.authUtils.generateToken(tokenPayload, '10m'),
      this.authUtils.generateToken(tokenPayload, '7d'),
    ]);

    await this.accountService.refreshTokenAction('update', email, refreshToken);

    const { createdAt, ...userRest } = user;
    const { password: pass, provider, refreshToken: token, ...rest } = acc;
    return {
      user: { ...userRest },
      account: { ...rest },
      accessToken,
      refreshToken,
    };
  }

  async login(payload: loginPayload) {
    const { email, password } = payload;

    const isAccountExists = await this.accountService.getOne(email);

    if (!isAccountExists) {
      throw new NotFoundException('Invalid Email or Password');
    }

    const isPasswordsMatch = await this.authUtils.compare(
      password,
      isAccountExists.password,
    );

    if (!isPasswordsMatch) {
      throw new NotFoundException('Invalid Email or Password');
    }

    const tokenPayload = {
      email,
      accountId: isAccountExists.id,
      userId: isAccountExists.userId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.authUtils.generateToken(tokenPayload, '10m'),
      this.authUtils.generateToken(tokenPayload, '7d'),
    ]);

    await this.accountService.refreshTokenAction('update', email, refreshToken);

    const user = await this.userService.getUser(isAccountExists.userId);

    const { createdAt, ...userRest } = user;
    const {
      password: pass,
      provider,
      refreshToken: token,
      ...rest
    } = isAccountExists;
    return {
      user: { ...userRest },
      account: { ...rest },
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(user: UserTokenPayload) {
    if (!user) {
      throw new ForbiddenException('Access Denied112');
    }
    const account = await this.accountService.getOne(user.email);

    if (!account) {
      throw new ForbiddenException('Access Deniedfff');
    }

    if (user.refreshToken !== account.refreshToken) {
      throw new ForbiddenException('Access Deniedfgdb');
    }

    const { refreshToken, ...rest } = user;
    const tokenPayload = {
      ...rest,
    };

    const tokens = await Promise.all([
      this.authUtils.generateToken(tokenPayload, '10m'),
      this.authUtils.generateToken(tokenPayload, '7d'),
    ]);

    await this.accountService.refreshTokenAction(
      'update',
      user.email,
      tokens[1],
    );

    return {
      accessToken: tokens[0],
      refreshToken: tokens[1],
    };
  }

  async logout(user: UserTokenPayload) {
    return await this.accountService.refreshTokenAction('delete', user.email);
  }
}
