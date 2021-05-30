import Board from './board.model';
import * as tasksRepo from '../tasks/task.memory.repository';

let boardsDB: any[] =[];

/**
 * This function return all Boards from the database
 * @return (array) boardsDB - It's array of Boards objects 
*/

const getAll = async () => boardsDB;

/**
 * This function create a new Board
 * @param (object) data - It's created Board
 * @return (object) newBoard - It's Board which will be created and add to the database
*/

const create = async (data: Board) => {
	const newBoard = new Board({title: data.title});
	newBoard.addColumn(data.columns);
	boardsDB.push(newBoard);
	return newBoard;
}

/**
 * This function return 'Board' by id from database 
 * @param (string) id - It's Boards id, which will be returned 
 * @return (object) board[0]
*/

const getByID = async (id: string) => {
	const board = boardsDB.filter((el)=>el.id === id);
	return board[0];
}

/**
 * This function is update board data in the database
 * @param (object) data - It's an object which contain a new data
 * @return (object) updatedBoard - It's updated Board
*/

const update = async (data: Board) => {
	let updatedBoard = {};
	for(let i=0; i<boardsDB.length; i+=1){
		if(boardsDB[i].id === data.id){
			boardsDB[i].title = data.title;
			updatedBoard = boardsDB[i];
		}
	}

	return updatedBoard;
}

/**
 * This function delete board from the database
 * @param (string) id - It's Boards id, which will be deleted from database 
 * @return (boolean) false - If Board was found
*/

const del = async (id: string) => {
	
	boardsDB = boardsDB.filter((elem)=>{
		if(elem.id !== id) return true
			return false;
	});
	await tasksRepo.delBoardsTask(id);
	
}


//module.exports = { getAll, create, getByID, update, del };
export { 
	getAll, 
	create, 
	getByID, 
	update, 
	del 
};
