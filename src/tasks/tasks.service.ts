import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import * as taskRepo from './task.memory.repository';

@Injectable()
export class TasksService {
  /*
  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }
*/
  getAll = (boardId: string) => taskRepo.getAll(boardId);

  create = (data: CreateTaskDto) => taskRepo.create(data);

  getByID = (boardId: string, taskId: string) =>
    taskRepo.getByID(boardId, taskId);

  update = (boardId: string, taskId: string, data: UpdateTaskDto) =>
    taskRepo.update(boardId, taskId, data);

  del = (boardId: string, taskId: string) => taskRepo.del(boardId, taskId);
  /*
  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
  */
}
