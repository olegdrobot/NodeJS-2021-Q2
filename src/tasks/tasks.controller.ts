import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Request, Response } from 'express';

@Controller('boards')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardId/tasks')
  async create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto) {
    const data: CreateTaskDto = {
      title: createTaskDto.title,
      order: createTaskDto.order,
      description: createTaskDto.description,
      userId: createTaskDto.userId,
      boardId: boardId,
      columnId: createTaskDto.columnId
    };
    const task = this.tasksService.create(data);
    if(task) {
      //res.status(201).send(Task.toResponse(task));
      //res.status(201).json(task);
      return task;
    } else {
      return "Task wasn't created";
    }
    //return this.tasksService.create(createTaskDto);
  }

  @Get(':boardId/tasks')
  async findAll(@Param('boardId') boardId: string) {
    const boardTasks = this.tasksService.getAll(boardId);
    //return this.tasksService.findAll();
    return boardTasks;
  }

  @Get(':boardId/tasks/:taskId')
  async findOne(@Param('boardId') boardId: string, @Param('taskId') taskId: string, @Res() res: Response) {
    const task = await this.tasksService.getByID(boardId, taskId);
    if (task) {
      res.status(200).json(task);
      //return task;
    }
    else {
      res.sendStatus(404);
      //return "Error Task ID";
  }
    //return this.tasksService.findOne(+id);
  }

  @Put(':boardId/tasks/:taskId')
  async update(@Param('boardId') boardId: string, @Body() updateTaskDto: UpdateTaskDto, @Param('taskId') taskId: string) {
    //return this.tasksService.update(+id, updateTaskDto);
    const task = this.tasksService.update(boardId, taskId, updateTaskDto);
    if(task){
      //res.status(200).send(Task.toResponse(task));
      return task;
    } else {
      return "Task wasn't updated";  
    }
  }

  @Delete(':boardId/tasks/:taskId')
  remove(@Param('boardId') boardId: string, @Param('taskId') taskId: string) {
    //return this.tasksService.remove(+id);
    this.tasksService.del(boardId, taskId);
  }
}
