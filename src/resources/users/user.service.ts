import * as usersRepo from './user.memory.repository';
import User from './user.model';

const getAll = () => usersRepo.getAll();

const create = (data: User) => usersRepo.create(data);

const getByID = (id: string) => usersRepo.getByID(id);

const del = (id: string) => usersRepo.del(id);

const update = (updateData: User) => usersRepo.update(updateData);

//module.exports = { getAll, create, getByID, del, update };
export {
	getAll, 
	create, 
	getByID, 
	del, 
	update
}