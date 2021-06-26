import { PORT } from './common/config';
import app from './app';
import {createConnection} from "typeorm";
//import {User} from "../../entity/User";
import * as usersService from '../src/resources/users/user.service';

createConnection().then(() => {
	app.listen(PORT, () =>
  console.log(`App is running on http://localhost: ${PORT}`)
);
	
}).then(()=>{
	const admin = {
		name: 'admin',
    	login: 'admin',
    	password: 'admin'
	}
	const user = usersService.create(admin);
	console.log('-----Create Admin--------- ', user);
}).catch(error => console.log("TypeORM connection error: ", error));


/*
app.listen(PORT, () =>
  console.log(`App is running on http://localhost: ${PORT}`)
);
*/

process.on('unhandledRejection', (err: Error) =>{
	console.log("process error ", err.message);
	process.exit(1);
});

process.on('uncaughtException', (err: Error) =>{
	console.log("process error ", err.message);
	process.exit(1);
});

