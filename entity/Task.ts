import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity() 

export class Task {
	
	@Column()
	id: string;

	@Column()
	title: string;

	@Column()
	order: number;

	@Column()
	description: string;

	@Column()
	userId: string | undefined;

	@Column()
	boardId: string;

	@Column()
	columnId: string | undefined;

}