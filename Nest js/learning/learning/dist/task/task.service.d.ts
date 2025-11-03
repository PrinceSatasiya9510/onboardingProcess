import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/user.entity';
export declare class TaskService {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
    getTaskById(id: string, user: UserEntity): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<Task>;
    deleteTask(id: string, user: UserEntity): Promise<void>;
    updateTask(id: string, createTaskDto: CreateTaskDto, user: UserEntity): Promise<Task>;
    getAllData(user: UserEntity): Promise<Task[]>;
}
