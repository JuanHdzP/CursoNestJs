/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private tasksService: TaskService) {}

  //@Get()
  //getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //    if(Object.keys(filterDto).length){
  //      return this.tasksService.getTasksWithFilters(filterDto);
  //    }else{
  //      return this.tasksService.getAllTasks();
  //    }
  //}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }
  //
  //@Get('/:id')
  //getTaskById(@Param('id') id: string): Task {
  //    return this.tasksService.getTaskById(id);
  //}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  //
  //@Delete('/:id')
  //deleteTask(@Param('id') id: string): void {
  //    this.tasksService.deleteTask(id);
  //}
  //

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  //@Post()
  //createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //    return this.tasksService.createTask(createTaskDto);
  //}
  //
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  //@Patch('/:id/status')
  //updateTaskStatus(
  //    @Param('id') id:string,
  //    @Body() updateTaskStatusDto:UpdateTaskStatusDto,
  //): Task{
  //    const {status} = updateTaskStatusDto;
  //    return this.tasksService.updateTaskStatus(id,status);
  //}

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
