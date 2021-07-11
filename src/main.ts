import { INestApplication } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { create } from './users/user.memory.repository';

async function bootstrap() {
  let app: INestApplication;
  //console.log('----USE_FASTYFY---- ', process.env.USE_FASTIFY);
  if (process.env.USE_FASTIFY == 'true') {
    console.log('---USE_FASTYFY----');
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
  } else {
    app = await NestFactory.create(AppModule);
  }

  //const app = await NestFactory.create(AppModule);
  await app.listen(4000);

  const admin = await create({
    name: 'admin',
    login: 'admin',
    password: 'admin'
  });
  //console.log('-----Create ADMIN--- ', admin);
}
bootstrap();
