import { Injectable } from '@nestjs/common';
import * as loginRepo from './auth.memory.repository';

@Injectable()
export class AuthService {
  getToken = (login: string, password: string) =>
    loginRepo.getToken(login, password);

  /*
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
 */
}
