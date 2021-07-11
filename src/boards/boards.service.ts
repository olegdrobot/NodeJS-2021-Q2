import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import * as boardRepo from './boards.memory.repository';

@Injectable()
export class BoardsService {

  create = (data: CreateBoardDto) => boardRepo.create(data);

  getAll = () => boardRepo.getAll();

  getByID = (id: string) => boardRepo.getByID(id);

  update = (data: UpdateBoardDto) => boardRepo.update(data);

  del = (id: string) => boardRepo.del(id);

}
