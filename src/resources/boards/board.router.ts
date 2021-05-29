/*
const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
*/

import * as express from 'express';
import Board from './board.model';
import * as boardsService from './board.service';

const router = express.Router();

router.route('/').get(async (req, res) => {
     
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});


router.route('/').post(async (req,res) =>{
  const board = await boardsService.create(req.body);
   res.status(201).send(Board.toResponse(board)); 
});

router.route('/:id').get(async (req,res)=>{
  const board  = await boardsService.getByID(req.params.id);
  if(board) res.status(200).send(Board.toResponse(board))
    else res.sendStatus(404);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.body); 
  res.status(200).send(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.del(req.params.id);
  res.sendStatus(200);
});

//module.exports = router;

export default router;
