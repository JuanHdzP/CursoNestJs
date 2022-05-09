import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  private task = [];

  getAllTasks() {
    return this.task;
  }
}
