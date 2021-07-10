import 'reflect-metadata';
import { getRepository, getConnection } from 'typeorm';
import { User } from './entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';
//import {Task} from "../../entity/Task";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
//import bcrypt from "bcryptjs";

const saltRounds = 10;

// let usersDB = new Array();

/**
 * This function return all Users from the database
 * @return (array) usersDB - It's array of Users objects
 */

//const getAll = async () => usersDB;
const getAll = async () => {
  //console.log('----USER get all------');
  const userRepository = getRepository(User);
  const users = userRepository.find();
  return users;
  //return '---retuen All Users';
};

const create = async (data: CreateUserDto /*Partial<User>*/) => {
  let { password } = data;
  const { name, login } = data;
  password = await bcrypt.hash(password, saltRounds);
  const dataUser = {
    name: name,
    login: login,
    password: password,
  };

  const userRepository = getRepository(User);
  const newUser = userRepository.create(dataUser);
  //console.log('----USER CREATE ', newUser);

  await userRepository.save(newUser);
  return newUser;
  /*
  return 'User';
  */
};

const getByID = async (id: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  return user;
};

const update = async (id: string, updateData: UpdateUserDto) => {
  //console.log('---UPDATE ', id, ' ', updateData);
  await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({
      name: updateData.name,
      login: updateData.login,
      password: updateData.password,
    })
    .where('id = :id', { id: id })
    .execute();
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  return user;
};

const del = async (id: string) => {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where('id = :id', { id: id })
    .execute();
  await getConnection()
    .createQueryBuilder()
    .update(Task)
    .set({ userId: null })
    .where('userId = :id', { id: id })
    .execute();
  //console.log('delUser ', deletedUser, ' ', updateTsks);
};

export { getAll, create, getByID, update, del };
