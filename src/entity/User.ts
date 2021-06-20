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
      name = 'USER',
      login = 'user',
      password = 'P@55w0rd',
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

}
