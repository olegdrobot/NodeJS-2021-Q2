import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
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
  async getAll(@Res() res: Response) {
    const users = this.usersService.getAll();
    //console.log('---User Controller ', users);
    res.send(
      (await users).map((item) => {
        User.toResponse(item);
      }),
    );
    //return users; - работает для экспресс
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.getByID(id);
    res.status(200).send(User.toResponse(user));
    //return user;
    //return this.usersService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    res.send(User.toResponse(user));
    // return user; - работает для экспресс
    //return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    this.usersService.del(id);
    // return this.usersService.remove(+id);
    res.send('User deleted');
    //return 'User deleted';- работает для экспресс
  }
}
