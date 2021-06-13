import * as usersRepo from './user.memory.repository';
const getAll = () => usersRepo.getAll();
const create = (data) => usersRepo.create(data);
const getByID = (id) => usersRepo.getByID(id);
const del = (id) => usersRepo.del(id);
const update = (updateData) => usersRepo.update(updateData);
//module.exports = { getAll, create, getByID, del, update };
export { getAll, create, getByID, del, update };
