import * as loginRepo from './login.memory.repository';
import { Request, Response, NextFunction } from 'express';
//import User from '../entity/User';

const getToken = (login: string, password: string) => loginRepo.getToken(login, password);

const checkToken = (req: Request, res:Response, next:NextFunction) => loginRepo.checkToken (req, res, next);

export {getToken, checkToken}