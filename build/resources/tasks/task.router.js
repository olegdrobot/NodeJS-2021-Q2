import * as express from 'express';
import Task from './task.model';
import * as tasksService from './task.service';
const router = express.Router();
router.route('/:boardId/tasks').get(async (res) => {
    //const { boardId } = req.params;
    const boardTasks = await tasksService.getAll();
    res.json(boardTasks.map(Task.toResponse));
});
router.route('/:boardId/tasks').post(async (req, res) => {
    const data = {
        title: String(req.body.title),
        order: Number(req.body.order),
        description: String(req.body.description),
        userId: String(req.body.userId),
        boardId: String(req.params['boardId']),
        columnId: String(req.body.columnId)
    };
    const task = await tasksService.create(data);
    res.status(201).send(Task.toResponse(task));
});
router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
    const task = await tasksService.getByID(String(req.params['boardId']), String(req.params['taskId']));
    if (task)
        res.status(200).send(Task.toResponse(task));
    else
        res.sendStatus(404);
});
router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.update(String(boardId), String(taskId), req.body);
    res.status(200).send(Task.toResponse(task));
});
router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
    const { boardId, taskId } = req.params;
    await tasksService.del(String(boardId), String(taskId));
    res.sendStatus(200);
});
export default router;
