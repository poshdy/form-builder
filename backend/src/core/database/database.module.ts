import { Global, Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './database_connection';
import { ConfigService } from '@nestjs/config';
import * as pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import schema from '../../schema';
@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const url = configService.get('database.url');
        const pool = new pg.Pool({ connectionString: url });

        return drizzle(pool, {
          logger: true,
          schema,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
