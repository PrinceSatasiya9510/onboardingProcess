import { Exclude } from "class-transformer";
import { Task } from "src/task/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    userName: string;

    @Column()
    password: string;

    @OneToMany((_type) => Task, task => task.user, { eager: true })
    tasks: Task[]
}