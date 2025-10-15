import { Task } from "src/task/task.entity";
export declare class UserEntity {
    id: string;
    userName: string;
    password: string;
    tasks: Task[];
}
