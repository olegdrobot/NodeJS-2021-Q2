import 'reflect-metadata';
import { getRepository, getConnection } from 'typeorm';
import { User } from './entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;


const getAll = async () => {
  const userRepository = getRepository(User);
  const users = userRepository.find();
  return users;
};

const create = async (data: CreateUserDto ) => {
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
  await userRepository.save(newUser);
  return newUser;
};

const getByID = async (id: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(id);
  return user;
};

const update = async (id: string, updateData: UpdateUserDto) => {
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
};

export { getAll, create, getByID, update, del };
