//import Task from './task.model';

import "reflect-metadata";
import {getRepository, getConnection} from "typeorm";
import {Task} from "../../entity/Task";

let tasksDB = new Array();

/**
 * This function return all Tasks from the database
 * @return (array) tasksDB - It's array of Tasks objects
*/

//const getAll = async () => tasksDB;

const getAll = async (boardId: string) => {
  //await createConnection();
  const taskRepository = getRepository(Task);
  const tasks = taskRepository.find({where: {boardId: boardId}});
  return tasks;
};

/**
 * This function create a new Task
 * @param (object) data - It's created Task
 * @return (object) newTask - It's Task which will be created and add to the database
*/

const create = async (data: Partial<Task>) => {
  //await createConnection();
  const taskRepository = getRepository(Task);
  const newTask = taskRepository.create(data);
  await taskRepository.save(newTask);
  return newTask;
/*
  const newTask = new Task(data);
  tasksDB.push(newTask);
  return newTask;
*/
};

/**
 * This function return 'Task' of the Board  from database using Tasks ID and Board ID
 * @param (string) boardId - It's Boards id, which contain the Task
 * @param (string) taskId - It's Tasks id, which will be returned
 * @return (object) task[0]
*/

const getByID = async (boardId: string, taskId: string) => {
  //await createConnection();
  const taskRepository = getRepository(Task);
  const tasks = taskRepository.findOne({where: {boardId: boardId, id: taskId}});
  return tasks;

  /*
  const task = tasksDB.filter((el)=>(el.boardId === boardId && el.id === taskId));
  return task[0];
  */
};

/**
 * This function is update Tasks data of the Board in the database using Tasks ID and Board ID
 * @param (object) data - It's an object which contain a new data
 * @param (string) taskId - It's Tasks id, which will be updated
 * @param (string) boardId - It's Boards id, which contain the Task
 * @return (object) updatedTask - It's updated Task
*/

const update = async (boardId: string, taskId: string, data: Task) => {
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

/*
  let updatedTask = {};
  for (let i=0; i<tasksDB.length; i+=1) {
    if (tasksDB[i].boardId === boardId && tasksDB[i].id === taskId ) {
      tasksDB[i].title = data.title;
      tasksDB[i].order = data.order;
      tasksDB[i].description = data.description;
      tasksDB[i].userId = data.userId;
      tasksDB[i].columnId = data.columnId;
      updatedTask = tasksDB[i];
    }
  }
*/
  
};

/**
 * This function is delete Task of the Board from the database using Tasks ID and Board ID
 * @param (string) taskId - It's Tasks id, which will be updated
 * @param (string) boardId - It's Boards id, which contain the Task
 * @return (object) updatedTask - It's updated Task
 * @return (boolean) false - If Task was found
*/

const del = async (boardId: string, taskId: string) => {
 const deletedTask = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Task)
    .where("id = :id", { id: taskId })
    .andWhere("boardId = :boardId", {boardId: boardId})
    .execute();
 console.log('deletedTask ', deletedTask);
 /*
 tasksDB = tasksDB.filter((el)=>{
    if (el.boardId !== boardId || el.id !== taskId) return true;
    return false;
  });
 */
};

/**
 * This function delete Tasks which belonged deleted Board
 * @param (string) id - ID deleted Board
*/

const delBoardsTask = async (id: string) => {
  tasksDB = tasksDB.filter((el)=>{
    if (el.boardId !== id) return true;
    return false;
  });
};

/**
 * This function assign 'null' to the users ID of Tasks
 * @param (string) id - It's ID of user which was deleted
*/

const delTaskUser = async (id: string) => {
  for (let i=0; i<tasksDB.length; i+=1) {
    if (tasksDB[i].userId === id) tasksDB[i].userId = null;
  }
};

/*
module.exports = { getAll, create, getByID, update, del, delBoardsTask, delTaskUser };
*/

export {
  getAll,
  create,
  getByID,
  update,
  del,
  delBoardsTask,
  delTaskUser,
};
