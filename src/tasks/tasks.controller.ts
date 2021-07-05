import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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
  async findOne(@Param('boardId') boardId: string, @Param('taskId') taskId: string) {
    const task = await this.tasksService.getByID(boardId, taskId);
    if (task) return task;
    else {
      return "Error Task ID";
  }
    //return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
