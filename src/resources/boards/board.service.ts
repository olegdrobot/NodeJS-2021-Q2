//const boardRepo = require('./board.memory.repository');

import * as boardRepo from './board.memory.repository';
import Board from './board.model';

const getAll = () => boardRepo.getAll();

const create = (data) => boardRepo.create(data);

const getByID = (id) => boardRepo.getByID(id);

const update = (data) => boardRepo.update(data);

const del = (id) => boardRepo.del(id);

//module.exports = { getAll, create, getByID, update, del };

export { 
	getAll, 
	create, 
	getByID, 
	update, 
	del 
};