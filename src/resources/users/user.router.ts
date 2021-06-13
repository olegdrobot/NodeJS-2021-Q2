import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
import User from './user.model';
import * as usersService from './user.service';

const router = express.Router();

router.route('/').get(async (_req: Request, res: Response): Promise<void> => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});


router.route('/').post(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const data = {
  	name: req.body.name,
  	login: req.body.login,
  	password: req.body.password,
  };

  const user = await usersService.create(data);
  if(user){
    res.status(201).send(User.toResponse(user));
  } else {
    next({
        status: 500,
        message: "User wasn't created"
      });
  }
  
});


router.route('/:id').get(async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const user = await usersService.getByID(String(req.params['id']));
    if(user) {
      res.status(200).send(User.toResponse(user));
    } else {
      next({
        status: 500,
        message: "Error UserID"
      });
      
    }
    
});


router.route('/:id').delete(async (req: Request, res: Response): Promise<void> => {
  await usersService.del(String(req.params['id']));
  res.sendStatus(204);
});

router.route('/:id').put(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = await usersService.update(req.body);
  if(user) {
    res.status(200).send(User.toResponse(user));
  } else {
     next({
        status: 500,
        message: "User wasn't updated"
      });
  }
  
});

export default router;
