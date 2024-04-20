import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    todoTitle: string;

    @Column()
    @IsNotEmpty()
    description: string;

    @Column({default:false})
    completed: boolean;

    @Column()
    userId : number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

}
