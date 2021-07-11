import { Injectable } from '@nestjs/common';
import * as loginRepo from './auth.memory.repository';

@Injectable()
export class AuthService {
  getToken = (login: string, password: string) =>
    loginRepo.getToken(login, password);
}
