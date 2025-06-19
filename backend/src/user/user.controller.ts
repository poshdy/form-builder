import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccountService } from 'src/core/account/account.service';
import { AuthenticationGuard } from 'src/core/auth/guards/authentication.guard';
import { User } from 'src/core/auth/decorators/user.decorator';
import { UserTokenPayload } from 'src/core/types';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly accountService: AccountService,
  ) {}

  @UseGuards(AuthenticationGuard)
  @Get('accounts')
  async getAccount(@User() user: UserTokenPayload) {
    return await this.userService.getAccounts(user.userId);
  }
}
