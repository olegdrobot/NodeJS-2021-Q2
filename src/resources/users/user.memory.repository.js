const User = require('./user.model');

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
	console.log('del id ', id);
	usersDB = usersDB.filter((elem)=>{
		if(elem.id !== id) return true
			else return false;
	});
	console.log("After delete ", usersDB);

}

module.exports = { getAll, create, getByID, del};
