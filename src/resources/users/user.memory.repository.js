const User = require('./user.model');

const usersDB =[];

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
	console.log('getByID ', usersDB, ' ', id);
	let user = usersDB.filter((el)=>{return el.id == id});
	console.log('getByID AFTER', user);
	return user[0];
}

module.exports = { getAll, create, getByID};
