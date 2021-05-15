const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  console.log("Hello getAll");		
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});



router.route('/').post(async (req, res) => {
  // console.log("Hello users ", req.body.name, ' ',req.body.login, ' ',req.body.password );	
  console.log('post id ',req.body);
  const data = {
  	name: req.body.name,
  	login: req.body.login,
  	password: req.body.password
  }
  //let user = new User(data);	

  const user = await usersService.create(data);
  // map user fields to exclude secret fields like "password"
  //console.log('user.router ', user);
  //res.status(201).send(users.map((el)=>JSON.stringify(el.toResponse)));
  res.status(201).send(User.toResponse(user)); 	
});


router.route('/:id').get(async (req,res)=>{
	//console.log('find user ',req.params.id );
	let user = await usersService.getByID(req.params.id);
	res.status(200).send(User.toResponse(user)); 
});



router.route('/:id').delete(async (req, res) => {
	console.log('delete user ',req.params.id );
	await usersService.del(req.params.id);
	res.sendStatus(204);
});

module.exports = router;
