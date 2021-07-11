import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import * as taskRepo from './task.memory.repository';

@Injectable()
export class TasksService {

  getAll = (boardId: string) => taskRepo.getAll(boardId);

  create = (data: CreateTaskDto) => taskRepo.create(data);

  getByID = (boardId: string, taskId: string) =>
    taskRepo.getByID(boardId, taskId);

  update = (boardId: string, taskId: string, data: UpdateTaskDto) =>
    taskRepo.update(boardId, taskId, data);

  del = (boardId: string, taskId: string) => taskRepo.del(boardId, taskId);

}
