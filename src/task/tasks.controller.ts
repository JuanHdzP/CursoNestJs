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
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TaskService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`)
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}

//@Get()
//getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
//    if(Object.keys(filterDto).length){
//      return this.tasksService.getTasksWithFilters(filterDto);
//    }else{
//      return this.tasksService.getAllTasks();
//    }
//}
//
//@Get('/:id')
//getTaskById(@Param('id') id: string): Task {
//    return this.tasksService.getTaskById(id);
//}
//
//@Delete('/:id')
//deleteTask(@Param('id') id: string): void {
//    this.tasksService.deleteTask(id);
//}
//
//@Post()
//createTask(@Body() createTaskDto: CreateTaskDto): Task {
//    return this.tasksService.createTask(createTaskDto);
//}
//
//@Patch('/:id/status')
//updateTaskStatus(
//    @Param('id') id:string,
//    @Body() updateTaskStatusDto:UpdateTaskStatusDto,
//): Task{
//    const {status} = updateTaskStatusDto;
//    return this.tasksService.updateTaskStatus(id,status);
//}