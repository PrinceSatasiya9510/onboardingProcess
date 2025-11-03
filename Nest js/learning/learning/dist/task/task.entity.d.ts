import { TaskStatus } from "./task-status.enum";
import { UserEntity } from "src/auth/user.entity";
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    user: UserEntity;
}
