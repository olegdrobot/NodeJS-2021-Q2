import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Res,
  UseGuards
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { Board } from './entities/board.entity';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @Res() res: Response
    ) {
    //console.log('---Create Board ', createBoardDto);
    const board = await this.boardsService.create(createBoardDto);
    //console.log('!!!--createdBoard ', board);
    if (board) {
      res.send(Board.toResponse(board));
      //return board; - работает для экспресс
    } else {
      res.status(404).send('Not found');
      //return "Board wasn't created"; - раюотает для экспресс
    }
    //return this.boardsService.create(createBoardDto);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const boards = await this.boardsService.getAll();
    //console.log('---GetAll ', boards);
    res.send(boards.map(Board.toResponse));
    //return boards; - работает для экспресс
    //return this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const board = await this.boardsService.getByID(id);
    console.log('---getBoardById ', board);
    if (board !== undefined) {
      res.send(Board.toResponse(board));
      //res.status(200).json(board); - работает для экспресс
      //return board
    } else {
      res.status(404).send('Not Found');
      //return "Error Board ID";
      //res.sendStatus(404); - работает для экспресс
    }
  }
  //return this.boardsService.findOne(+id);

  /*
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    const board = await this.boardsService.update(updateBoardDto);
    if(board !== undefined ) {
      return board;
    } else {
      return "Board wasn't updated";
      }
  }
*/
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @Res() res: Response
  ) {
    const board = await this.boardsService.update(updateBoardDto);
    if (board !== undefined) {
      //res.status(200).json(board); - работает для экспресс
      res.send(Board.toResponse(board));
    } else {
      res.status(401);
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response
    ) {
    const boardID = await this.boardsService.del(id);
    console.log('--DELETE ', boardID);
    res.send(boardID);
    //return boardID; - работает для экспресс
    //return this.boardsService.remove(+id);
  }
}
