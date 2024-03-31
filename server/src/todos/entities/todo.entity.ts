import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    todo: string;

    @Column({default:false})
    completed: boolean;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
