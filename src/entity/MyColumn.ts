import {Entity, PrimaryColumn, Column} from "typeorm";
import * as uuid from 'uuid';

interface IColumn {
  id: string;
  title: string;
  order: number;
}

@Entity() 

export class MyColumn implements IColumn {
	  constructor({
    id = uuid.v4(),
    title = 'string',
    order = 0,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
	
	@PrimaryColumn()
	id: string;

	@Column()
	title: string;

   @Column()
   order: number;
	
}