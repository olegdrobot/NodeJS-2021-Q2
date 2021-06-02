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

export {logService};