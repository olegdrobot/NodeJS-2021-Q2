import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
//import { Observable } from 'rxjs';
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();
    //console.log('---canActive ', request.path);
    if (['/doc', '/', '/login'].includes(request.path)) {
        return true;
    }
    const tokenStr = request.headers.authorization;
    console.log('---tokenStr ', request.headers);
    if (tokenStr === undefined) {
        //res.status(401);
        //return false;
        throw new UnauthorizedException();
      }
      const [type, token] = String(tokenStr).split(' ');
     // console.log('type ', type);
     // console.log('token ', token);
      if(type !== 'Bearer' ){
          //res.status(401);
          //return false;
          throw new UnauthorizedException();
      }
      const isVerified = jwt.verify(String(token), String('JWT_SECRET_KEY'));
    if (!isVerified) {
    //res.status(401).json({error:'Unauthorized'});
    //return false;
    throw new UnauthorizedException();
    }

    //return next();  
    return true;
  }
}