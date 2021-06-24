import { Request, Response } from 'express';
import * as express from 'express';
//import {User} from "../../entity/User";
import * as loginService from './login.service';



const router = express.Router();

router.route('/').post(async (req: Request, res: Response): Promise<void> =>{
    const { login, password } = req.body;
    const user = loginService.getByName(String(login), String(password));
    console.log('getByName ', user);
    res.send(201);



});

export default router;