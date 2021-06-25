import { Request, Response } from 'express';
import * as express from 'express';
//import {User} from "../entity/User";
import * as loginService from './login.service';



const router = express.Router();

router.route('/login').post(async (req: Request, res: Response): Promise<void> =>{
    const { login, password } = req.body;
    console.log('---------LOGIN ', login, ' ', password);
    const token = await loginService.getToken(String(login), String(password));
    console.log('getByName ', token);
    if(!token) {
        console.log('-------/login IF---------');
        res.status(401).json({error:'Unauthorized'});}
    else {res.status(200).json({token});}



});

export default router;



