import "reflect-metadata";
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import bcrypt from "bcrypt";

const getByName = async (login: string, password: string) => {
    const userRepository = getRepository(User);
    const user = await userRepository.find({where: {login: login}});
    const result = user.filter((item)=>{
        return bcrypt.compareSync(password, item.password);
    }); 
    if(result.length == 0) return false
    else return result[0];
   
}

export {getByName}