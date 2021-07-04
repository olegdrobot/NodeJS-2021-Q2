import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
   type: "postgres",
   host: "localhost",
   port: 5432,
   username: "postgres",
   password: "123postgres",
   database: "task7-DB",
   autoLoadEntities: true,
   synchronize: true
  }), 
  UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection){}
}
