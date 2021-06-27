import {Entity, PrimaryColumn, Column} from "typeorm";
import * as uuid from 'uuid';
import {MyColumn} from './MyColumn'

interface IBoard {
  id: string;
  title: string;
  columns: Array<MyColumn>;
}

@Entity() 

export class Board implements IBoard {
	  constructor({
    id = uuid.v4(),
    title = 'String',
    columns = [
      {
        id: 'string',
        title: 'string',
        order: 0
      },
      {
        id: 'string',
        title: 'string',
        order: 0
      },
      {
        id: 'string',
        title: 'string',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
	
	@PrimaryColumn()
	id: string;

	@Column()
	title: string;

  @Column({type: 'json', nullable: true})
    columns: MyColumn[]
}