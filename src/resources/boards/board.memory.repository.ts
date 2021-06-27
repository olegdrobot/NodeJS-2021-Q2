//import Board from './board.model';
import "reflect-metadata";
import {getRepository, getConnection} from "typeorm";
import {Board} from "../../entity/Board";
import {Task} from "../../entity/Task";
//import * as tasksRepo from '../tasks/task.memory.repository';

//let boardsDB = new Array();


/**
 * This function return all Boards from the database
 * @return (array) boardsDB - It's array of Boards objects
*/

//const getAll = async () => boardsDB;
const getAll = async () => {
  const boardRepository = getRepository(Board);
  const boards = boardRepository.find();
  return boards;
}

/**
 * This function create a new Board
 * @param (object) data - It's created Board
 * @return (object) newBoard - It's Board which will be created and add to the database
*/

const create = async (data: Partial<Board>) => {
  const boardRepository = getRepository(Board);
  const newBoard = boardRepository.create(data);
  await boardRepository.save(newBoard);
  return newBoard;
  /*
  const newBoard = new Board({ title: data.title });
  newBoard.addColumn(data.columns);
  boardsDB.push(newBoard);
  return newBoard;
  */
};

/**
 * This function return 'Board' by id from database
 * @param (string) id - It's Boards id, which will be returned
 * @return (object) board[0]
*/

const getByID = async (id: string) => {
  const boardRepository = getRepository(Board);
  const board = boardRepository.findOne({where: {id: id}});
  return board;
  /*
  const board = boardsDB.filter((el)=>el.id === id);
  return board[0];
  */
};

/**
 * This function is update board data in the database
 * @param (object) data - It's an object which contain a new data
 * @return (object) updatedBoard - It's updated Board
*/

const update = async (data: Board) => {
  await getConnection()
    .createQueryBuilder()
    .update(Board)
    .set({ title: data.title,
           columns: data.columns 
      })
    .where("id = :id", { id: data.id })
    .execute();
  const boardRepository = getRepository(Board);  
  const updatedBoard = boardRepository.findOne({where: {id: data.id}});  
  console.log('updatedBoard ', updatedBoard);
  return updatedBoard;

  /*
  let updatedBoard = {};
  for (let i=0; i<boardsDB.length; i+=1) {
    if (boardsDB[i].id === data.id) {
      boardsDB[i].title = data.title;
      updatedBoard = boardsDB[i];
    }
  }

  return updatedBoard;
  */
};

/**
 * This function delete board from the database
 * @param (string) id - It's Boards id, which will be deleted from database
 * @return (boolean) false - If Board was found
*/

const del = async (id: string) => {
  console.log('DEL BOARD ID ', id);
  const taskRepository = getRepository(Task);
  const task = taskRepository.find({where: {boardId: id}});
  console.log('deleted tasks ', task);

  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Board)
    .where("id = :id", { id: id })
    .execute();
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Task)
    .where("boardId = :id", { id: id })
    .execute();  
  return id;  
/*
  boardsDB = boardsDB.filter((elem)=>{
    if (elem.id !== id) return true;
    return false;
  });
  await tasksRepo.delBoardsTask(id);
*/
};


export {
  getAll,
  create,
  getByID,
  update,
  del,
};
