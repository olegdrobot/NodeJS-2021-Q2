import { Request, Response } from 'express';
import * as express from 'express';
//import {User} from "../entity/User";
import * as loginService from './login.service';



const router = express.Router();

router.route('/').post(async (req: Request, res: Response): Promise<void> =>{
    const { login, password } = req.body;
    const token = await loginService.getToken(String(login), String(password));
    console.log('getByName ', token);
    if(!token) res.send(401).send('Unauthorized')
    else res.send(token);



});

export default router;