import { Request, Response } from 'express';
import * as express from 'express';
import Task from './task.model';
import * as tasksService from './task.service';

const router = express.Router();

router.route('/:boardId/tasks').get(async (_req: Request, res: Response): Promise<void> => {
  const boardTasks = await tasksService.getAll();
  res.json(boardTasks.map(Task.toResponse));
});

router.route('/:boardId/tasks').post(async (req: Request, res: Response): Promise<void> => {
  const data = {
    title: String(req.body.title),
    order: Number(req.body.order),
    description: String(req.body.description),
    userId: req.body.userId,
    boardId: String(req.params['boardId']),
    columnId: req.body.columnId,
  };
  const task = await tasksService.create(data);

  res.status(201).send(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').get(async (req: Request, res: Response): Promise<void> => {
  const task = await tasksService.getByID(String(req.params['boardId']), String(req.params['taskId']));
  if (task) res.status(200).send(Task.toResponse(task));
  else res.sendStatus(404);
});

router.route('/:boardId/tasks/:taskId').put(async (req: Request, res: Response): Promise<void> => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.update(String(boardId), String(taskId), req.body);
  res.status(200).send(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').delete(async (req: Request, res: Response): Promise<void> => {
  const { boardId, taskId } = req.params;
  await tasksService.del(String(boardId), String(taskId));
  res.sendStatus(200);
});


export default router;

