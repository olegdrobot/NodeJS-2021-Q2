const User = require('./user.model');
const tasksRepo = require('../tasks/task.memory.repository');

let usersDB =[];

const getAll = async () => usersDB;

const create = async (data) => {
	
	const newUser = new User (data);
	usersDB.push(newUser);	
	return newUser;  
};

const getByID = async (id) => {
	const user = usersDB.filter((el)=>el.id === id);
	return user[0];
}

const del = async (id) => {
	usersDB = usersDB.filter((elem)=>{
		if(elem.id !== id) return true
			return false;
	});

	await tasksRepo.delTaskUser(id);
    
}

const update = async (updateData) => {
	let updatedUser = {};
	for(let i=0; i<usersDB.length; i+=1){
		if(usersDB[i].id === updateData.id) {
			usersDB[i].name = updateData.name;
			usersDB[i].login = updateData.login;
			usersDB[i].password = updateData.password;
			updatedUser = usersDB[i];
		}
	}

	return updatedUser;
}

module.exports = { getAll, create, getByID, del, update};
