"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const task_status_enum_1 = require("./task-status.enum");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./task.entity");
const typeorm_2 = require("typeorm");
let TaskService = class TaskService {
    taskRepository;
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getTaskById(id, user) {
        const found = await this.taskRepository.findOne({ where: { id: id, user } });
        console.log("🚀 ~ TaskService ~ getTaskById ~ found:", found);
        if (!found) {
            throw new common_1.NotFoundException(`Task with Id ${id} not found!`);
        }
        return found;
    }
    async createTask(createTaskDto, user) {
        const { title, description } = createTaskDto;
        const task = this.taskRepository.create({
            title, description, status: task_status_enum_1.TaskStatus.OPEN, user
        });
        await this.taskRepository.save(task);
        return task;
    }
    async deleteTask(id, user) {
        const result = await this.taskRepository.delete({ id, user });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Task with Id ${id} not found or you don't have permission to delete it.`);
        }
    }
    async updateTask(id, createTaskDto, user) {
        if (!createTaskDto) {
            throw new common_1.NotFoundException('update id data not found!');
        }
        const task = await this.getTaskById(id, user);
        const { title, description } = createTaskDto;
        task.title = title;
        task.description = description;
        await this.taskRepository.save(task);
        return task;
    }
    async getAllData(user) {
        return await this.taskRepository.find({ where: { user } });
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map