const Task = require('./task.model');

const DB = require('../database/db');

// let tasksDB =[];

let tasksDB = DB.tasksDB; 

const getAll = async () => tasksDB;

const create = async (data) => {
	const newTask = new Task (data);
	//console.log("User.repo Create ", newUser, ' ', usersDB);
	tasksDB.push(newTask);
	console.log("User.repo Create After ", tasksDB);
	
	return newTask;  
}

const getByID = async (boardId, taskId) => {
	let task = tasksDB.filter((el)=>{return (el.boardId == boardId && el.id == taskId)});
	//console.log('TASK getByID AFTER', user);
	return task[0];
}

const update = async (boardId, taskId, data) => {
	let updatedTask = {};
	tasksDB.map((item) => {
		if(item.boardId == boardId && item.id == taskId ) {
			item.title = data.title;
			item.order = data.order;
			item.description = data.description;
			item.userId = data.userId;
			item.columnId = data.columnId;
			updatedTask = item;
		}
	});
	return updatedTask;
}

const del = async (boardId, taskId) => {
	tasksDB = tasksDB.filter((el)=>{
		if(el.boardId !== boardId || el.id !== taskId) return true
			else return false;
	});
	console.log("After delete ", tasksDB);
};


module.exports = { getAll, create, getByID, update, del };
