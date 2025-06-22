import { Global, Module } from '@nestjs/common';
import { DatabaseConnection } from './database_connection';

@Global()
@Module({
  providers: [DatabaseConnection],
  exports: [DatabaseConnection],
})
export class DatabaseModule {}
