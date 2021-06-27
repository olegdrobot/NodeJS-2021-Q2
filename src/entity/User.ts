import {Entity, PrimaryColumn, Column} from "typeorm";
import * as uuid from 'uuid';

interface IUser {
    name: string;
    login: string;
    password: string;
    id?: string;
}

@Entity()
export class User implements IUser {
	constructor({
      id = uuid.v4(),
      name = 'string',
      login = 'string',
      password = 'string'
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

    static toResponse(user: Partial<IUser>) {
      const { id, name, login } = user;
      return { id, name, login };
    }

}
