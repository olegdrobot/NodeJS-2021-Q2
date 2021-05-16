const Task = require('./task.model');

let tasksDB =[];

const getAll = async () => tasksDB;

const create = async (data) => {
	const newTask = new Task (data);
	tasksDB.push(newTask);
	
	return newTask;  
}

const getByID = async (boardId, taskId) => {
	const task = tasksDB.filter((el)=>(el.boardId === boardId && el.id === taskId));
	return task[0];
}

const update = async (boardId, taskId, data) => {
	let updatedTask = {};
	tasksDB.map((item) => {
		if(item.boardId === boardId && item.id === taskId ) {
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
			return false;
	});
};

const delBoardsTask = async (id) => {
	tasksDB = tasksDB.filter((el)=>{
		if(el.boardId !== id) return true
			return false;
	});
}

const delTaskUser = async (id) => {
	tasksDB.map((item)=>{
		if(item.userId === id) item.userId = null;
	});
}


module.exports = { getAll, create, getByID, update, del, delBoardsTask, delTaskUser };
