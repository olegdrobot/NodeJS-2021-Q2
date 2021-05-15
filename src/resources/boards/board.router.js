const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
     
  const boards = await boardsService.getAll();
  // map user fields to exclude secret fields like "password"
  console.log("board getAll ", boards);   
  res.json(boards.map(Board.toResponse));
});


router.route('/').post(async (req,res) =>{
  console.log("board create ", req.body);
  const board = await boardsService.create(req.body);
   res.status(201).send(Board.toResponse(board)); 
});


module.exports = router;
