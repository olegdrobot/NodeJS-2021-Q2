const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const create = (data) => usersRepo.create(data);

const getByID = (id) => usersRepo.getByID(id);

const del = (id) => usersRepo.del(id);

module.exports = { getAll, create, getByID, del };
