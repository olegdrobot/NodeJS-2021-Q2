import { Request, Response } from 'express';
import * as express from 'express';
import * as loginService from './login.service';



const router = express.Router();

router.route('/login').post(async (req: Request, res: Response): Promise<void> =>{
    const { login, password } = req.body;
    const token = await loginService.getToken(String(login), String(password));
    if(!token) {
        res.status(401).json({error:'Unauthorized'});}
    else {res.status(200).json({token});}



});

export default router;



