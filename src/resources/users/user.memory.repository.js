const User = require('./user.model');
const tasksRepo = require('../tasks/task.memory.repository');

let usersDB =[];

/**
 * This function return all Users from the database
 * @return (array) usersDB - It's array of Users objects 
*/

const getAll = async () => usersDB;

/**
 * This function create a new User
 * @param (object) data - It's created User
 * @return (object) newUser - It's User which will be created and add to the database
*/

const create = async (data) => {
	
	const newUser = new User (data);
	usersDB.push(newUser);	
	return newUser;  
};

/**
 * This function return 'User' by id from database 
 * @param (string) id - It's Users id, which will be returned 
 * @return (object) user[0]
*/

const getByID = async (id) => {
	const user = usersDB.filter((el)=>el.id === id);
	return user[0];
}

/**
 * This function delete user from the database
 * @param (string) id - It's Users id, which will be deleted from database 
 * @return (boolean) false - If User was found
*/

const del = async (id) => {
	usersDB = usersDB.filter((elem)=>{
		if(elem.id !== id) return true
			return false;
	});

	await tasksRepo.delTaskUser(id);
    
}

/**
 * This function is update users data in the database
 * @param (object) updateData - It's an object which contain a new data
 * @return (object) updatedUser - It's updated User
*/

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
