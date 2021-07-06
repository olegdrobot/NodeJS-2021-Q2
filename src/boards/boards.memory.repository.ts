import "reflect-metadata";
import {getRepository, getConnection} from "typeorm";
import {Board} from "./entities/board.entity";
import {Task} from "../tasks/entities/task.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

const getAll = async () => {
  const boardRepository = getRepository(Board);
  const boards = boardRepository.find();
  return boards;
}

const create = async (data: CreateBoardDto) => {
  const boardRepository = getRepository(Board);
  const newBoard = boardRepository.create(data);
  await boardRepository.save(newBoard);
  return newBoard;
};

const getByID = async (id: string) => {
  const boardRepository = getRepository(Board);
  const board = boardRepository.findOne({where: {id: id}});
  return board;
};

const update = async (data: UpdateBoardDto) => {
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
};

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

};


export {
  getAll,
  create,
  getByID,
  update,
  del,
};
