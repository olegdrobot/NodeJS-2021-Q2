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
	for(let i=0; i<tasksDB.length; i+=1){
		if(tasksDB[i].boardId === boardId && tasksDB[i].id === taskId ) {
			tasksDB[i].title = data.title;
			tasksDB[i].order = data.order;
			tasksDB[i].description = data.description;
			tasksDB[i].userId = data.userId;
			tasksDB[i].columnId = data.columnId;
			updatedTask = tasksDB[i];
		}
	}

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
	for(let i=0; i<tasksDB.length; i+=1){
		if(tasksDB[i].userId === id) tasksDB[i].userId = null;
	}

}


module.exports = { getAll, create, getByID, update, del, delBoardsTask, delTaskUser };
