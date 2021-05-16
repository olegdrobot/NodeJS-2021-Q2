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
	usersDB.map((item)=>{
		if(item.id === updateData.id) {
			item.name = updateData.name;
			item.login = updateData.login;
			item.password = updateData.password;
			updatedUser = item;
		}
	});
	return updatedUser;
}

module.exports = { getAll, create, getByID, del, update};
