import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Request, Response } from 'express';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    //console.log('---Create Board ', createBoardDto);
    const board = this.boardsService.create(createBoardDto);
    //console.log('!!!--createdBoard ', board);
    if(board){
      return board;
    } else {
      return "Board wasn't created";  
    }
    //return this.boardsService.create(createBoardDto);
  }

  @Get()
  async findAll() {
    const boards = this.boardsService.getAll();
    //console.log('---GetAll ', boards);
    return boards;
    //return this.boardsService.findAll();
  
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const board = await this.boardsService.getByID(id);
    console.log('---getBoardById ', board);
    if (board !== undefined) {
      res.status(200).json(board);
      //return board
    }
    else {
      //return "Error Board ID";
      res.sendStatus(404);
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
    async update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto, @Res() res: Response) {
    const board = await this.boardsService.update(updateBoardDto);
    if(board !== undefined ) {
      res.status(200).json(board);
     } else {
      res.status(401);
     }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const boardID = await this.boardsService.del(id);
    console.log('--DELETE ', boardID);
    return boardID;
    //return this.boardsService.remove(+id);
  }
}
