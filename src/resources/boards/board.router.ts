import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
//import Board from './board.model';

import * as boardsService from './board.service';

const router = express.Router();

router.route('/').get(async (_req: Request, res: Response): Promise<void> => {
  const boards = await boardsService.getAll();
  //res.json(boards.map(Board.toResponse));
  res.json(boards);
});


router.route('/').post(async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
  const board = await boardsService.create(req.body);
  if(board){
    //res.status(201).send(Board.toResponse(board));
    res.status(201).send(board);
  } else {
    next({
      status: 500,
      message: "Board wasn't created"
    });  
  }
  
});

router.route('/:id').get(async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
  const board = await boardsService.getByID(String(req.params['id']));
  if (board) {res.status(200).json(board) /*res.status(200).send(Board.toResponse(board))*/;}
  else {
    res.sendStatus(404);
      next({
      status: 500,
      message: "Error Board ID"
    });  
  }
});

router.route('/:id').put(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const board = await boardsService.update(req.body);
  if(board) {
    //res.status(200).send(Board.toResponse(board));
    res.status(200).json(board);
  } else {
    next({
        status: 500,
        message: "Board wasn't updated"
      });
  }
  
});

router.route('/:id').delete(async (req: Request, res: Response): Promise<void> => {
  const boardID = await boardsService.del(String(req.params['id']));
  //res.sendStatus(200);
  console.log('DELETE BOARD ',boardID);
  res.status(204).json(boardID);
});


export default router;
