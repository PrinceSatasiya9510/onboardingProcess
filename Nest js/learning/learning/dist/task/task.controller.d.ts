import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { UserEntity } from 'src/auth/user.entity';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    getAllData(user: UserEntity): Promise<Task[]>;
    getTaskById(id: string, user: UserEntity): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<Task>;
    deleteTask(id: string, user: UserEntity): Promise<void>;
    updateTask(id: string, createTaskDto: CreateTaskDto, user: UserEntity): Promise<Task>;
}
