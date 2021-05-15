const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
     
  const boards = await boardsService.getAll();
  // map user fields to exclude secret fields like "password"
  //console.log("board getAll ", boards);   
  res.json(boards.map(Board.toResponse));
});


router.route('/').post(async (req,res) =>{
  //console.log("board create ", req.body);
  const board = await boardsService.create(req.body);
   res.status(201).send(Board.toResponse(board)); 
});

router.route('/:id').get(async (req,res)=>{
  //console.log('board getID ', req.params.id);
  let board  = await boardsService.getByID(req.params.id);
  if(board) res.status(200).send(Board.toResponse(board))
    else res.sendStatus(404);
});

router.route('/:id').put(async (req, res) => {
  //console.log('board update ', req.body);
  let board = await boardsService.update(req.body); 
  res.status(200).send(Board.toResponse(board));
  //res.sendStatus(200);
});

router.route('/:id').delete(async (req, res) => {
  //console.log('delete board ',req.params.id );
  await boardsService.del(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
