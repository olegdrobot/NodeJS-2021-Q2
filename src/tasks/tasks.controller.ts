import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { Task } from './entities/task.entity';

@Controller('boards')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':boardId/tasks')
  async create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
    @Res() res: Response,
  ) {
    const data: CreateTaskDto = {
      title: createTaskDto.title,
      order: createTaskDto.order,
      description: createTaskDto.description,
      userId: createTaskDto.userId,
      boardId: boardId,
      columnId: createTaskDto.columnId,
    };
    const task = await this.tasksService.create(data);
    if (task) {
      res.send(Task.toResponse(task));
    } else {
      return "Task wasn't created";
    }
  }

  @Get(':boardId/tasks')
  async findAll(@Param('boardId') boardId: string, @Res() res: Response) {
    const boardTasks = await this.tasksService.getAll(boardId);
    res.send(boardTasks.map(Task.toResponse));
  }

  @Get(':boardId/tasks/:taskId')
  async findOne(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Res() res: Response,
  ) {
    const task = await this.tasksService.getByID(boardId, taskId);
    if (task) {
      res.send(Task.toResponse(task));
    } else {
      res.status(404).send('Task not found');
    }
  }

  @Put(':boardId/tasks/:taskId')
  async update(
    @Param('boardId') boardId: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('taskId') taskId: string,
    @Res() res: Response,
  ) {
    const task = await this.tasksService.update(boardId, taskId, updateTaskDto);
    if (task) {
      res.send(Task.toResponse(task));
    } else {
      return "Task wasn't updated";
    }
  }

  @Delete(':boardId/tasks/:taskId')
  remove(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Res() res: Response,
  ) {
    this.tasksService.del(boardId, taskId);
    res.send(200);
  }
}
