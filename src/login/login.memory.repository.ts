import "reflect-metadata";
import {getRepository} from "typeorm";
import { Request, Response, NextFunction } from 'express';
import {User} from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getToken = async (login: string, password: string): Promise<string | undefined> => {
    const userRepository = getRepository(User);
    const user = await userRepository.find({where: {login: login}});
    console.log('-----getTocen ', user);
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
        console.log('-----getTocen ELSE');
        const token = jwt.sign({ id: result[0]?.id, login }, "secret");
        return token;
    } 
       
}

const checkToken = (req: Request, res:Response, next:NextFunction) => {
    const tokenStr = req.header('Authorization');
    //console.log('------- tokenStr ', req.headers.authorization);
    if (tokenStr === undefined) {
        res.status(401);
      }
      const [type, token] = String(tokenStr).split(' ');
      console.log('type ', type);
      if(type !== 'Bearer' ){
          res.status(401);
      }
      const isVerified = jwt.verify(String(token), "secret");
    if (!isVerified) {
    res.status(401).json({error:'Unauthorized'});
    }

    return next();  
}

export {getToken, checkToken}