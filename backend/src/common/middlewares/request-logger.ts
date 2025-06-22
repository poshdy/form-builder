import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export class RequestLogger implements NestMiddleware {
  private readonly logger = new Logger('App');
  use(req: Request, res: Response, next: (error?: Error | any) => void) {
    const { path, url, method } = req;

    console.log('middleware');
    this.logger.log({ method, url, path });

    next();
  }
}
