const User = require('./user.model');
const tasksRepo = require('../tasks/task.memory.repository');

//const DB = require('../database/db');

//let usersDB = DB.usersDB; 

let usersDB =[];

const getAll = async () => 
	// TODO: mock implementation. should be replaced during task development
   
    usersDB 
;

const create = async (data) => {
	
	const newUser = new User (data);
	//console.log("User.repo Create ", newUser, ' ', usersDB);
	usersDB.push(newUser);
	console.log("User.repo Create After ", usersDB);
	
	return newUser;  
};

const getByID = async (id) => {
	//console.log('getByID ', usersDB, ' ', id);
	let user = usersDB.filter((el)=>{return el.id == id});
	//console.log('getByID AFTER', user);
	return user[0];
}

const del = async (id) => {
	//console.log('del id ', id);
	usersDB = usersDB.filter((elem)=>{
		if(elem.id !== id) return true
			else return false;
	});

	await tasksRepo.delTaskUser(id);
	console.log("After delete ", usersDB);

}

const update = async (updateData) => {
	let updatedUser = {};
	usersDB.map((item)=>{
		if(item.id == updateData.id) {
			item.name = updateData.name;
			item.login = updateData.login;
			item.password = updateData.password;
			updatedUser = item;
		}
	});
	return updatedUser;
}

module.exports = { getAll, create, getByID, del, update};
