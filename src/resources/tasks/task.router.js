const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = req.params;
  const boardTasks = await tasksService.getAll(boardId); 
  res.json(boardTasks.map(Task.toResponse));
});

router.route('/:boardId/tasks').post(async (req, res) => {
   const data = {
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId
   };
   const task = await tasksService.create(data);
   res.status(201).send(Task.toResponse(task));   
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const task = await tasksService.getByID(req.params.boardId, req.params.taskId);
  if(task) res.status(200).send(Task.toResponse(task))
    else res.sendStatus(404);
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await tasksService.update(boardId, taskId, req.body);
  res.status(200).send(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;
  await tasksService.del(boardId, taskId);
  res.sendStatus(200);
});




module.exports = router;
