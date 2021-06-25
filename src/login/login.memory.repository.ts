import "reflect-metadata";
import {getRepository} from "typeorm";
import { Request, Response, NextFunction } from 'express';
import {User} from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getToken = async (login: string, password: string): Promise<string | undefined> => {
    const userRepository = getRepository(User);
    const user = await userRepository.find({where: {login: login}});
    const result = user.filter((item)=>{
        return bcrypt.compareSync(password, item.password);
    }); 
    /*
    if(result.length == 0) return false
    else return result[0];
   */
    //return result[0];
    if(result.length == 0) return undefined
    else {
        const token = jwt.sign({ id: result[0]?.id, login }, "secret");
        return token;
    } 
       
}

const checkToken = (req: Request, _res:Response, next:NextFunction) => {
    const tokenStr = req.headers.authorization;
    if (tokenStr === undefined) {
        throw new Error('Unauthorized user!');
      }
      const [type, token] = tokenStr.split(' ');
      console.log('type ', type);
      const isVerified = jwt.verify(String(token), "secret");
    if (!isVerified) {
    throw new Error('Unauthorized user!');
    }

    next();  
}

export {getToken, checkToken}