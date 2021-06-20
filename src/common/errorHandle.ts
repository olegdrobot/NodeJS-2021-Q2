import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import fs from 'fs';

function logService(req: Request, res: Response, next: NextFunction) {
	const date = new Date();
	next();
	finished(res, ()=>{
	  console.log("Date and time: ", date);
	  console.log("url: ", req.path);
	  console.log("query: ", req.query);
	  console.log('params: ', req.params);
  	  console.log('body: ', req.body);
  	  console.log('status code: ', res.statusCode);
	  const msg = `${date} ${req.path} ${JSON.stringify(req.query)} ${JSON.stringify(req.params)} ${JSON.stringify(req.body)} ${res.statusCode} \n`;
	  console.log('msg ', msg);
	  fs.appendFile("log.txt", msg, (error) => {
      	if (error) {
      	  throw error;
     	}
      });
	});
	
    
}


interface generalError extends Error {
  status: number;
  message: string;
}


function errorCatcher(err: generalError, _req: Request, res: Response, _next: NextFunction){
	console.log('Error status: ', err.status, 'Error message: ', err.message);
	const date = new Date();
	const msg = `${date} Error status: ${err.status} err.status: ${err.message} \n`;

	fs.appendFile("logErrors.txt", msg, (error) => {
      	if (error) {
      	  throw error;
     	}
      });

	res.status(500).send({
    status: err.status,
    message: err.message
    });
    _next();
}

export {logService, errorCatcher};