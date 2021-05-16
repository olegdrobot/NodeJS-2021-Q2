const Board = require('./board.model');
const tasksRepo = require('../tasks/task.memory.repository');

let boardsDB =[];

const getAll = async () => boardsDB;

const create = async (data) => {
	const newBoard = new Board({title: data.title});
	newBoard.addColumn(data.columns);
	boardsDB.push(newBoard);
	return newBoard;
}

const getByID = async (id) => {
	const board = boardsDB.filter((el)=>el.id === id);
	return board[0];
}

const update = async (data) => {
	let updatedBoard = {};
	for(let i=0; i<boardsDB.length; i+=1){
		if(boardsDB[i].id === data.id){
			boardsDB[i].title = data.title;
			updatedBoard = boardsDB[i];
		}
	}

	return updatedBoard;
}

const del = async (id) => {
	
	boardsDB = boardsDB.filter((elem)=>{
		if(elem.id !== id) return true
			return false;
	});
	await tasksRepo.delBoardsTask(id);
	
}


module.exports = { getAll, create, getByID, update, del };
