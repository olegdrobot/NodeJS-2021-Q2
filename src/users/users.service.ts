import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as usersRepo from './user.memory.repository';

@Injectable()
export class UsersService {

  getAll = () => usersRepo.getAll();

  create = (data: CreateUserDto) => usersRepo.create(data);

  getByID = (id: string) => usersRepo.getByID(id);

  update = (id: string, updateUserDto: UpdateUserDto) =>
    usersRepo.update(id, updateUserDto);

  del = (id: string) => usersRepo.del(id);

}
