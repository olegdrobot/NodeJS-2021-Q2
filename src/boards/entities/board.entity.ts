import { Entity, PrimaryColumn, Column } from 'typeorm';
import * as uuid from 'uuid';
import { CreateMyColumnDto } from '../dto/create-mycolumn.dto ';

@Entity()
export class Board {
  constructor({
    id = uuid.v4(),
    title = 'String',
    columns = [
      {
        id: 'string',
        title: 'string',
        order: 0,
      },
      {
        id: 'string',
        title: 'string',
        order: 0,
      },
      {
        id: 'string',
        title: 'string',
        order: 0,
      },
    ],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ type: 'json', nullable: true })
  columns: CreateMyColumnDto[];

  static toResponse(board: Board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
