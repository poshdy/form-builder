import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(new Logger());
  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });
  app?.use(cookieParser());
  await app.listen(4000);
}
bootstrap();
