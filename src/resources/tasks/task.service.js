const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const create = (data) => tasksRepo.create(data);

const getByID = (boadrId, taskId) => tasksRepo.getByID(boadrId, taskId);

const update = (boardId, taskId, data) => tasksRepo.update(boardId, taskId, data);

const del = (boardId, taskId) => tasksRepo.del(boardId, taskId);

module.exports = { getAll, create, getByID, update, del };
