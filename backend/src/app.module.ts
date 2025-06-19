import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './core/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AccountModule } from './core/account/account.module';
import { FormModule } from './form/form.module';
import configuration from './core/configuration/configuration';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,

    AuthModule,
    UserModule,
    AccountModule,
    FormModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
