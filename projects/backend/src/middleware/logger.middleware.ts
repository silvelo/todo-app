import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`Request: ${req.method} ${req.originalUrl}`); 

    if (req.body && Object.keys(req.body).length > 0) {
      this.logger.log(`Request Body: ${JSON.stringify(req.body)}`);
    }
    next();
  }
}
