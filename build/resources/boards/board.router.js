import * as express from 'express';
import Board from './board.model';
import * as boardsService from './board.service';
const router = express.Router();
router.route('/').get(async (res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
});
router.route('/').post(async (req, res) => {
    const board = await boardsService.create(req.body);
    res.status(201).send(Board.toResponse(board));
});
router.route('/:id').get(async (req, res) => {
    //let BoardId: string; 
    //BoardId = req.params['id'];
    const board = await boardsService.getByID(String(req.params['id']));
    if (board)
        res.status(200).send(Board.toResponse(board));
    else
        res.sendStatus(404);
});
router.route('/:id').put(async (req, res) => {
    const board = await boardsService.update(req.body);
    res.status(200).send(Board.toResponse(board));
});
router.route('/:id').delete(async (req, res) => {
    //const BoardId: string = req.params.id;
    await boardsService.del(String(req.params['id']));
    res.sendStatus(200);
});
//module.exports = router;
export default router;
