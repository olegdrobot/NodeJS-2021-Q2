const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();

const create = (data) => boardRepo.create(data);

module.exports = { getAll, create };
