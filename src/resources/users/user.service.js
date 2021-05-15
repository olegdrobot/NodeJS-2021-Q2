const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const create = (data) => usersRepo.create(data);

const getByID = (id) => usersRepo.getByID(id);

module.exports = { getAll, create, getByID };
