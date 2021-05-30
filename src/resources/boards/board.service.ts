import * as boardRepo from './board.memory.repository';
import Board from './board.model';

const getAll = () => boardRepo.getAll();

const create = (data: Board) => boardRepo.create(data);

const getByID = (id: string) => boardRepo.getByID(id);

const update = (data: Board) => boardRepo.update(data);

const del = (id: string) => boardRepo.del(id);


export {
  getAll,
  create,
  getByID,
  update,
  del,
};
