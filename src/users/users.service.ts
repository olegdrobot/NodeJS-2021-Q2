import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as usersRepo from './user.memory.repository';

@Injectable()
export class UsersService {
  /*
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  getAll() {
    return () => usersRepo.getAll();
    //this.getAll = () => usersRepo.getAll();
  }
*/
  getAll = () => usersRepo.getAll();

  create = (data: CreateUserDto) => usersRepo.create(data);

  getByID = (id: string) => usersRepo.getByID(id);

  update = (id: string, updateUserDto: UpdateUserDto) =>
    usersRepo.update(id, updateUserDto);

  del = (id: string) => usersRepo.del(id);
  /*
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  */
}
