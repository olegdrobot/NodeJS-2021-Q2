import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (['/doc', '/', '/login'].includes(request.path)) {
      return true;
    }
    const tokenStr = request.headers.authorization;
    console.log('---tokenStr ', request.headers);
    if (tokenStr === undefined) {
      throw new UnauthorizedException();
    }
    const [type, token] = String(tokenStr).split(' ');
    if (type !== 'Bearer') {
      throw new UnauthorizedException();
    }
    const isVerified = jwt.verify(String(token), String('JWT_SECRET_KEY'));
    if (!isVerified) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
