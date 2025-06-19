import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AccountService } from 'src/core/account/account.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AccountService],
})
export class UserModule {}
