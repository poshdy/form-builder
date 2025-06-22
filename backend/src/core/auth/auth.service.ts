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
    // check if the email is exits in database

    const account = await this.accountService.getOne(payload.email);

    console.log('account', account);
    // if yes throw an error and inform the user with a descriptive message
    if (account) {
      throw new BadRequestException('this email is taken try another one');
    }
    // // create user record in db
    const { firstName, lastName, email, password } = payload;
    const user = await this.userService.createUser({
      firstName,
      lastName,
    });
    console.log('user', user);
    // // hash user's password

    const hashedPassword = await this.authUtils.hash(password);
    // create account record in db
    const acc = await this.accountService.createAccount({
      userId: user.id,
      email,
      hashedPassword,
    });
    // // generate access, and refresh tokens

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
    // // return user data along with user data

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

    console.log('token', tokenPayload);
    console.log('before new tokens');

    const tokens = await Promise.all([
      this.authUtils.generateToken(tokenPayload, '10m'),
      this.authUtils.generateToken(tokenPayload, '7d'),
    ]);
    console.log('before new tokens');

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
