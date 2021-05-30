import { config } from 'dotenv';
import path from 'path';
import process from 'process';

config({
  path: path.join(__dirname, '../../.env'),
});

export const { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE } = process.env;


/*
import {loadConfig} from 'config.ts';
import dotenv from 'dotenv';
import path from 'path';
import process from 'process';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});


module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true'
};


export default loadConfig({
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true'
});
*/
