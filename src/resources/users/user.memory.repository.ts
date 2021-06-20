//import User from './user.model';
//import * as tasksRepo from '../tasks/task.memory.repository';

import "reflect-metadata";
import {getRepository, getConnection} from "typeorm";
import {User} from "../../entity/User";
import {Task} from "../../entity/Task";

// let usersDB = new Array();

/**
 * This function return all Users from the database
 * @return (array) usersDB - It's array of Users objects
*/

//const getAll = async () => usersDB;
const getAll = async () => {
  const userRepository = getRepository(User);
  const users = userRepository.find();
  return users;

};
/**
 * This function create a new User
 * @param (object) data - It's created User
 * @return (object) newUser - It's User which will be created and add to the database
*/

const create = async (data: Partial<User>) => {
  const userRepository = getRepository(User);
  const newUser = userRepository.create(data);
  await userRepository.save(newUser);
  return new User(data);
/*
  const newUser: User = new User(data);
  usersDB.push(newUser);
  return newUser;
*/
};

/**
 * This function return 'User' by id from database
 * @param (string) id - It's Users id, which will be returned
 * @return (object) user[0]
*/

const getByID = async (id: string) => {
  const userRepository = getRepository(User);
  const user = userRepository.find({where: {id: id}});
  return user;
  /*
      const user = usersDB.filter((el)=>el.id === id);
      return user[0];
  */    
};

/**
 * This function delete user from the database
 * @param (string) id - It's Users id, which will be deleted from database
 * @return (boolean) false - If User was found
*/

const del = async (id: string) => {
  const deletedUser = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", { id: id })
    .execute();
  const updateTsks = await getConnection()
    .createQueryBuilder()
    .update(Task)
    .set({ userId: "null" })
    .where("userId = :id", { id: id })
    .execute();  
   console.log('delUser ', deletedUser, ' ', updateTsks);

/*
  usersDB = usersDB.filter((elem)=>{
    if (elem.id !== id) return true;
    return false;
  });

  await tasksRepo.delTaskUser(id);
*/ 
};

/**
 * This function is update users data in the database
 * @param (object) updateData - It's an object which contain a new data
 * @return (object) updatedUser - It's updated User
*/

const update = async (id: string, updateData: Partial<User>) => {
   const updatedUser = await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({ name: updateData.name, 
           login: updateData.login,
           password: updateData.password
     })
    .where("id = :id", { id: id })
    .execute();
    return updatedUser;
/*
  let updatedUser = {};
  for (let i=0; i<usersDB.length; i+=1) {
    if (usersDB[i].id === updateData.id) {
      usersDB[i].name = updateData.name;
      usersDB[i].login = updateData.login;
      usersDB[i].password = updateData.password;
      updatedUser = usersDB[i];
    }
  }

  return updatedUser;
*/
};


export {
  getAll,
  create,
  getByID,
  del,
  update,
};
