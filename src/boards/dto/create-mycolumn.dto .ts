import * as uuid from 'uuid';

export class CreateMyColumnDto {
  constructor({ id = uuid.v4(), title = 'string', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
  id: string;
  title: string;
  order: number;
}
