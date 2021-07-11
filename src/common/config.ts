import { config } from 'dotenv';
import path from 'path';
import process from 'process';

config({
  path: path.join(__dirname, '../../.env'),
});

export const {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
  USE_FASTIFY,
} = process.env;
