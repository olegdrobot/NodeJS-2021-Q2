import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
//import Task from './task.model';
import {Task} from "../../entity/Task";
import * as tasksService from './task.service';

const router = express.Router();

router.route('/:boardId/tasks').get(async (req: Request, res: Response): Promise<void> => {
  const boardTasks = await tasksService.getAll(String(req.params['boardId']));
  //res.json(boardTasks.map(Task.toResponse));
  res.json(boardTasks);
});

router.route('/:boardId/tasks').post(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const data: Partial<Task> = {
    
    title: String(req.body.title),
    order: Number(req.body.order),
    description: String(req.body.description),
    userId: req.body.userId,
    boardId: String(req.params['boardId']),
    columnId: req.body.columnId
  };
  console.log('hello ', data);
  const task = await tasksService.create(data);
  if(task) {
    //res.status(201).send(Task.toResponse(task));
    res.status(201).json(task);
  } else {
     next({
        status: 500,
        message: "Task wasn't created"
      });
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const task = await tasksService.getByID(String(req.params['boardId']), String(req.params['taskId']));
  if (task) res.status(200).json(task) /*res.status(200).send(Task.toResponse(task))*/;
  else {
    res.sendStatus(404);
    next({
        status: 500,
        message: "Error Task ID"
      });
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.update(String(boardId), String(taskId), req.body);
  if(task){
    //res.status(200).send(Task.toResponse(task));
    res.status(200).json(task);
  } else {
     next({
        status: 500,
        message: "Task wasn't updated"
      });
  }
  
});

router.route('/:boardId/tasks/:taskId').delete(async (req: Request, res: Response): Promise<void> => {
  const { boardId, taskId } = req.params;
  await tasksService.del(String(boardId), String(taskId));
  res.sendStatus(200);
});


export default router;

