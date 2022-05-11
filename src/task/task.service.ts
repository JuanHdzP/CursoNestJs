import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { throwError } from 'rxjs';
import { stat } from 'fs';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
  ) {}
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

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    return this.tasksRepository.getTasks(filterDto);
  }
  //
  //  getTaskById(id: string): Task {
  //    const found = this.tasks.find((task) => task.id === id);
  //    if (!found) {
  //      throw new NotFoundException(`Task with id: "${id}" not found`);
  //    }
  //    return found;
  //  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with id: "${id}" not found`);
    }

    return found;
  }
  //
  //  deleteTask(id: string): void {
  //    const found = this.getTaskById(id);
  //    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  //  }
  //

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id: "${id}" not found`);
    }
  }
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

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  //
  //  updateTaskStatus(id: string, status: TaskStatus) {
  //    const tasks = this.getTaskById(id);
  //    tasks.status = status;
  //    return tasks;
  //  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}
