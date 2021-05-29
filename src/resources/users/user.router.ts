import * as express from 'express';
import User from './user.model';
import * as usersService from './user.service';

const router = express.Router();

/*
const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
*/

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});



router.route('/').post(async (req, res) => {
  const data = {
  	name: req.body.name,
  	login: req.body.login,
  	password: req.body.password
  }

  const user = await usersService.create(data);
  res.status(201).send(User.toResponse(user)); 	
});


router.route('/:id').get(async (req,res)=>{
	const user = await usersService.getByID(req.params.id);
	res.status(200).send(User.toResponse(user)); 
});



router.route('/:id').delete(async (req, res) => {
	await usersService.del(req.params.id);
	res.sendStatus(204);
});

router.route('/:id').put(async (req, res) => {
	const user = await usersService.update(req.body); 
	res.status(200).send(User.toResponse(user));
});

// module.exports = router;
export default router;