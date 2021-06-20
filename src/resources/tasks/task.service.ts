import * as tasksRepo from './task.memory.repository';
//import Task from './task.model';
import {Task} from "../../entity/Task";

const getAll = (boardId: string) => tasksRepo.getAll(boardId);

const create = (data: Partial<Task>) => tasksRepo.create(data);

const getByID = (boadrId: string, taskId: string) => tasksRepo.getByID(boadrId, taskId);

const update = (boardId: string, taskId: string, data: Task) => tasksRepo.update(boardId, taskId, data);

const del = (boardId: string, taskId: string) => tasksRepo.del(boardId, taskId);

const delBoardsTask = (id: string) => tasksRepo.delBoardsTask(id);

const delTaskUser = (id: string) => tasksRepo.delTaskUser(id);


export {
  getAll,
  create,
  getByID,
  update,
  del,
  delBoardsTask,
  delTaskUser,
};
