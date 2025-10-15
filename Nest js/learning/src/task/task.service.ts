import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/user.entity';


@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }

    async getTaskById(id: string, user: UserEntity): Promise<Task> {

        const found = await this.taskRepository.findOne({ where: { id: id, user } })
        console.log("🚀 ~ TaskService ~ getTaskById ~ found:", found)
        if (!found) {
            throw new NotFoundException(`Task with Id ${id} not found!`)
        }
        return found
    }

    async createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<Task> {
        const { title, description } = createTaskDto
        const task = this.taskRepository.create({
            title, description, status: TaskStatus.OPEN, user
        })
        await this.taskRepository.save(task)
        return task
    }

    async deleteTask(id: string, user: UserEntity): Promise<void> {
        const result = await this.taskRepository.delete({ id, user });
        if (result.affected === 0) {
            throw new NotFoundException(`Task with Id ${id} not found or you don't have permission to delete it.`);
        }
    }

    async updateTask(id: string, createTaskDto: CreateTaskDto, user: UserEntity): Promise<Task> {
        if (!createTaskDto) {
            throw new NotFoundException('update id data not found!')
        }
        const task = await this.getTaskById(id, user);
        const { title, description } = createTaskDto
        task.title = title;
        task.description = description;
        await this.taskRepository.save(task);
        return task;
    }

    async getAllData(user: UserEntity): Promise<Task[]> {
        return await this.taskRepository.find({ where: { user } });
    }
}