import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { AuthGuard } from 'src/auth/auth.guards';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createTodoDto: Todo): Promise<Todo> {
    const userId = req.user.sub;
    return this.todosService.createTodo(userId, createTodoDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req): Promise<Todo[]> {
    const userId = req.user.sub;
    return this.todosService.findAllTodo(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req): Promise<Todo> {
    const userId = req.user.sub;
    return this.todosService.findOneTodo(+id, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() todo: UpdateTodoDto, @Request() req): Promise<Todo> {
    const userId = req.user.sub;
    return this.todosService.updateTodo(+id, todo, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req): Promise<string> {
    const userId = req.user.sub;
    return this.todosService.deleteTodo(+id, userId);
  }
}
