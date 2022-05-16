/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Task with id: "${id}" not found`);
    }

    return found;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: "${id}" not found`);
    }
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}

//   private tasks: Task[] = [];
//
//   getAllTasks(): Task[] {
//    return this.tasks;
//  }
//
//  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
//    const { status, search } = filterDto;
//    let tasks = this.getAllTasks();
//    if (status) {
//      tasks = tasks.filter((task) => task.status === status);
//    }
//    if (search) {
//      tasks = tasks.filter((task) => {
//        if (task.title.includes(search) || task.description.includes(search)) {
//          return true;
//        }
//        return false;
//      });
//    }
//    return tasks;
//  }
//
//  getTaskById(id: string): Task {
//    const found = this.tasks.find((task) => task.id === id);
//    if (!found) {
//      throw new NotFoundException(`Task with id: "${id}" not found`);
//    }
//    return found;
//  }
//
//  deleteTask(id: string): void {
//    const found = this.getTaskById(id);
//    this.tasks = this.tasks.filter((task) => task.id !== found.id);
//  }
//
//  createTask(createTaskDto: CreateTaskDto): Task {
//    const { title, description } = createTaskDto;
//    const task: Task = {
//      id: uuid(),
//      title,
//      description,
//      status: TaskStatus.OPEN,
//    };
//
//    this.tasks.push(task);
//
//    return task;
//  }
//
//  updateTaskStatus(id: string, status: TaskStatus) {
//    const tasks = this.getTaskById(id);
//    tasks.status = status;
//    return tasks;
//  }
