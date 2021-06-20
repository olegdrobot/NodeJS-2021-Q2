import * as usersRepo from './user.memory.repository';
import User from './user.model';

const getAll = () => usersRepo.getAll();

const create = (data: Partial<User>) => usersRepo.create(data);

const getByID = (id: string) => usersRepo.getByID(id);

const del = (id: string) => usersRepo.del(id);

const update = (updateData: Partial<User>) => usersRepo.update(updateData);

export {
  getAll,
  create,
  getByID,
  del,
  update,
};
