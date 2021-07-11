import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import * as fs from 'fs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const date = new Date();
    finished(res, () => {
      const msg = `${date} ${req.path} ${JSON.stringify(
        req.query,
      )} ${JSON.stringify(req.params)} ${JSON.stringify(req.body)} ${
        res.statusCode
      } \n`;
      fs.appendFile('log.txt', msg, (error) => {
        if (error) {
          throw error;
        }
      });
    });
    next();
  }
}
