import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
//import { finished } from 'stream';
import * as fs from 'fs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const date = new Date();
	const msg = `${date} Error status: ${status} path: ${request.url} \n`;

	fs.appendFile("logErrors.txt", msg, (error) => {
      	if (error) {
      	  throw error;
     	}
      });

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: date,
        path: request.url,
      });
  }
}