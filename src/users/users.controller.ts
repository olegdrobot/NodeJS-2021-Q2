import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    //console.log('---User CREATE Controller ', createUserDto);
    const user = await this.usersService.create(createUserDto); 
    res.status(201).send(User.toResponse(user));
    //return user;
    //return this.usersService.create(createUserDto);
  }

  @Get()
  async getAll() {
    const users = this.usersService.getAll();
    //console.log('---User Controller ', users);
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.getByID(id);
    res.status(200).send(User.toResponse(user));
    //return user;
    //return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = this.usersService.update(id, updateUserDto);
    return user; 
    //return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
   this.usersService.del(id);
    // return this.usersService.remove(+id);
   return 'User deleted';
  }
}
