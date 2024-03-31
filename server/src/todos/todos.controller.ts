import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() todo: Todo): Promise<Todo> {
    return this.todosService.createTodo(todo);
  }

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAllTodo();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todosService.findOneTodo(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    return this.todosService.updateTodo(+id, todo);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.todosService.deleteTodo(+id);
  }
}
