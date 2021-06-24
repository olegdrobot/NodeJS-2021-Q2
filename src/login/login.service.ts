import * as loginRepo from './login.memory.repository';
//import User from '../entity/User';

const getByName = (login: string, password: string) => loginRepo.getByName(login, password);

export {getByName}