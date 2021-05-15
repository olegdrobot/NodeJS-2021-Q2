const Board = require('./board.model');
const tasksRepo = require('../tasks/task.memory.repository');

//const DB = require('../database/db');

//let boardsDB = DB.boardsDB; 
//let tasksDB = DB.tasksDB;

let boardsDB =[];

const getAll = async () => boardsDB;

const create = async (data) => {
	const newBoard = new Board({title: data.title});
	newBoard.addColumn(data.columns);
	boardsDB.push(newBoard);
	//console.log("Board.repo Create After ", boardsDB);
	return newBoard;
}

const getByID = async (id) => {
	let board = boardsDB.filter((el)=>{return el.id == id});
	//console.log('getByID AFTER', user);
	return board[0];
}

const update = async (data) => {
	let updatedBoard = {};
	boardsDB.map((item)=>{
		if(item.id == data.id){
			item.title = data.title;
			updatedBoard = item;
		}
	});
	return updatedBoard;
}

const del = async (id) => {
	
	boardsDB = boardsDB.filter((elem)=>{
		if(elem.id !== id) return true
			else return false;
	});
	await tasksRepo.delBoardsTask(id);
	/*
	tasksDB = tasksDB.filter((item)=>{
		if(item.boardId !== id) return true
			else return false;
	})
	console.log("tasksDB (board) ", tasksDB, 'boardId ', id);
	*/
}


module.exports = { getAll, create, getByID, update, del };
