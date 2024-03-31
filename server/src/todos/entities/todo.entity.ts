import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    todo: string;

    @Column({default:false})
    completed: boolean;

    @Column()
    createdAt: Date;
}
