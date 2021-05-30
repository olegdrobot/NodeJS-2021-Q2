import * as tasksRepo from './task.memory.repository';
import Task from './task.model';

const getAll = () => tasksRepo.getAll();

const create = (data: Task) => tasksRepo.create(data);

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
