import {Entity, PrimaryColumn, Column} from "typeorm";
import * as uuid from 'uuid';

@Entity()
export class Task {
    constructor({
        id = uuid.v4(),
        title = 'string',
        order = 0,
        description = 'string',
        userId = null,
        boardId = 'string',
        columnId = 'string',
      } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
      }
      
      @PrimaryColumn()
      id: string;
  
      @Column()
      title: string;
  
      @Column()
      order: number;
  
      @Column()
      description: string;
  
      @Column('varchar', { nullable: true })
      userId: string | null = null;
  
      @Column({ nullable: true })
      boardId: string;
  
      @Column({ nullable: true })
      columnId: string;

}
