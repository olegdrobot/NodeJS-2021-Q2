import { Request, Response } from 'express';
import * as express from 'express';
import Board from './board.model';
import * as boardsService from './board.service';

const router = express.Router();

router.route('/').get(async (_req: Request, res: Response): Promise<void> => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});


router.route('/').post(async (req: Request, res: Response): Promise<void> =>{
  const board = await boardsService.create(req.body);
  res.status(201).send(Board.toResponse(board));
});

router.route('/:id').get(async (req: Request, res: Response): Promise<void> =>{
  const board = await boardsService.getByID(String(req.params['id']));
  if (board) res.status(200).send(Board.toResponse(board));
  else res.sendStatus(404);
});

router.route('/:id').put(async (req: Request, res: Response): Promise<void> => {
  const board = await boardsService.update(req.body);
  res.status(200).send(Board.toResponse(board));
});

router.route('/:id').delete(async (req: Request, res: Response): Promise<void> => {
  await boardsService.del(String(req.params['id']));
  res.sendStatus(200);
});


export default router;
