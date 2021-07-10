import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123postgres',
      database: 'task7-DB',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
