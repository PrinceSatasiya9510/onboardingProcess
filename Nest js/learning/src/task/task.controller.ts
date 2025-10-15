import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import type { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get()
    getAllData(
        @GetUser() user: UserEntity
    ): Promise<Task[]> {
        return this.taskService.getAllData(user)
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string, @GetUser() user: UserEntity): Promise<Task> {
        return this.taskService.getTaskById(id, user)
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: UserEntity
    ): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string, @GetUser() user: UserEntity) {
        return this.taskService.deleteTask(id, user)
    }

    @Patch('/:id')
    updateTask(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto, @GetUser() user: UserEntity) {
        return this.taskService.updateTask(id, createTaskDto, user)
    }
}