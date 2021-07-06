import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import * as boardRepo from './boards.memory.repository';

@Injectable()
export class BoardsService {
  /*
  create(createBoardDto: CreateBoardDto) {
    return 'This action adds a new board';
  }
  */
  create = (data:CreateBoardDto) => boardRepo.create(data);
  
  getAll = () => boardRepo.getAll();

  getByID = (id: string) => boardRepo.getByID(id);

  update = (data: UpdateBoardDto) => boardRepo.update(data);

  del = (id: string) => boardRepo.del(id);
  /*
  findAll() {
    return `This action returns all boards`;
  }
  

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }
  
  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
*/  
}
