import { Module } from '@nestjs/common';
import { AccountService } from './account.service';

@Module({
  exports: [AccountModule],
  providers: [AccountService],
})
export class AccountModule {}
