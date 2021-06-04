import { PORT } from './common/config';
import app from './app';

app.listen(PORT, () =>
  console.log(`App is running on http://localhost: ${PORT}`),
);


/*
process.on('unhandledRejection', (err: Error) =>{
	console.log("process error ", err.message);
	process.exit(1);
});

process.on('uncaughtException', (err: Error) =>{
	console.log("process error ", err.message);
	process.exit(1);
});

*/