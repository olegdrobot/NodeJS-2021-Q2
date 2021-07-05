import "reflect-metadata";
import {getRepository, getConnection} from "typeorm";
import {Task} from "./entities/task.entity";
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from "./dto/update-task.dto";
//import Task from './task.model';
//let tasksDB = new Array();

//const getAll = async () => tasksDB;

const getAll = async (boardId: string) => {
  //await createConnection();
  console.log('-------Task getAll----------');
  const taskRepository = getRepository(Task);
  const tasks = taskRepository.find({where: {boardId: boardId}});
  return tasks;
  //return 'Task getAll';
};

const create = async (data: CreateTaskDto) => {
  //await createConnection();
  const taskRepository = getRepository(Task);
  const newTask = taskRepository.create(data);
  await taskRepository.save(newTask);
  return newTask;
};

const getByID = async (boardId: string, taskId: string) => {
  //await createConnection();
  const taskRepository = getRepository(Task);
  const tasks = taskRepository.findOne({where: {boardId: boardId, id: taskId}});
  return tasks;
}  

const update = async (boardId: string, taskId: string, data: UpdateTaskDto) => {
  await getConnection()
    .createQueryBuilder()
    .update(Task)
    .set({ title: data.title, 
           order: data.order,
           description: data.description,
           userId: data.userId,
           columnId: data.columnId 
     })
    .where("id = :id", { id: taskId })
    .andWhere("boardId = :boardId", {boardId: boardId})
    .execute();
  const taskRepository = getRepository(Task);
  const updatedTask = taskRepository.findOne({where: {boardId: boardId, id: taskId}});  
    return updatedTask;
}   

const del = async (boardId: string, taskId: string) => {
  const deletedTask = await getConnection()
     .createQueryBuilder()
     .delete()
     .from(Task)
     .where("id = :id", { id: taskId })
     .andWhere("boardId = :boardId", {boardId: boardId})
     .execute();
  console.log('deletedTask ', deletedTask);

 };

export {
  getAll,
  create,
  getByID,
  update,
  del
};
