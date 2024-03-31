import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    todo: string;

    @Column({default:false})
    completed: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
