import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { Board } from './entities/board.entity';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto, @Res() res: Response) {
    const board = await this.boardsService.create(createBoardDto);
    if (board) {
      res.send(Board.toResponse(board));
    } else {
      res.status(404).send('Not created');
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const boards = await this.boardsService.getAll();
    res.send(boards.map(Board.toResponse));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const board = await this.boardsService.getByID(id);
    console.log('---getBoardById ', board);
    if (board !== undefined) {
      res.send(Board.toResponse(board));
    } else {
      res.status(404).send('Not Found');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @Res() res: Response,
  ) {
    const board = await this.boardsService.update(updateBoardDto);
    if (board !== undefined) {
      res.send(Board.toResponse(board));
    } else {
      res.status(401);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const boardID = await this.boardsService.del(id);
    console.log('--DELETE ', boardID);
    res.send(boardID);
  }
}
