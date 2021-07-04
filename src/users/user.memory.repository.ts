import "reflect-metadata";
import {getRepository, getConnection} from "typeorm";
import {User} from "./entities/user.entity";
//import {Task} from "../../entity/Task";
import bcrypt from "bcrypt";

const saltRounds = 10;

// let usersDB = new Array();

/**
 * This function return all Users from the database
 * @return (array) usersDB - It's array of Users objects
*/

//const getAll = async () => usersDB;
const getAll = async () => {
  console.log('----USER get all------');
  const userRepository = getRepository(User);
  const users = userRepository.find();
  return users;
  //return '---retuen All Users';
};



export {
  getAll
};
