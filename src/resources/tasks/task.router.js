const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  //console.log("Hello getAll");		
  //const tasks = await tasksService.getAll();
  const { boardId } = req.params;
  console.log("boardId ", boardId);
  const boardTasks = await tasksService.getAll(boardId); 
     console.log("boardTasks ", boardTasks);
  //res.sendStatus(200);
  res.json(boardTasks.map(Task.toResponse));
});

router.route('/:boardId/tasks').post(async (req, res) => {
   //const { boardId } = req.params;
   console.log('tasks create ', req.body, ' ', req.params.boardId);
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
  console.log('task getId ', req.params);
  let task = await tasksService.getByID(req.params.boardId, req.params.taskId);
  //res.sendStatus(200);
  if(task) res.status(200).send(Task.toResponse(task))
    else res.sendStatus(404);
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  console.log('task UPDATE ', req.params, ' ', req.body);
  const { boardId, taskId } = req.params;
  let task = await tasksService.update(boardId, taskId, req.body);
  res.status(200).send(Task.toResponse(task));
  //res.sendStatus(200);
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  console.log('task DELETE ', req.params);
  const { boardId, taskId } = req.params;
  await tasksService.del(boardId, taskId);
  res.sendStatus(200);
});




module.exports = router;
