import * as uuid from 'uuid';
import { Entity, PrimaryColumn, Column } from 'typeorm';

/*
interface IUser {
    name: string;
    login: string;
    password: string;
    id?: string;
}
*/
@Entity()
export class User {
  constructor({
    id = uuid.v4(),
    name = 'string',
    login = 'string',
    password = 'string',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column({ nullable: true })
  password: string;

  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
