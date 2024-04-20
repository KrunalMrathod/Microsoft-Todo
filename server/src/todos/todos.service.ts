import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private userService: UsersService,
  ) {}

  async createTodo(userId: number, todoData: Todo): Promise<Todo> {
    const user = await this.userService.findOneUser(userId);
  

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const todo = this.todoRepository.create({
      ...todoData,
      userId: user.id,
    });

    return this.todoRepository.save(todo);
  }

  async findAllTodo(@Request() req): Promise<Todo[]> {
    const userId = req;
    return this.todoRepository.find({ where: { userId } });
  }

  async findOneTodo(id: number, userId: number): Promise<Todo> {
   
    try {
      const todo = await this.todoRepository.findOneOrFail({
        where: { id, userId },
      });
  
      return todo;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Todo not found');
      } else {
        throw error;
      }
    }

  }

  async updateTodo(id: number, todo: UpdateTodoDto, userId: number): Promise<Todo> {
    const existingTodo = await this.findOneTodo(id, userId);

    if (!existingTodo) {
      throw new NotFoundException('Todo not found');
    }

    if (existingTodo.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this todo',
      );
    }

    await this.todoRepository.update(id, todo);
    return this.findOneTodo(id, userId);
  }


  async deleteTodo(id: number, userId: number): Promise<string> {
    const existingTodo = await this.findOneTodo(id, userId);

    if (!existingTodo) {
      throw new NotFoundException('Todo not found');
    }

    if (existingTodo.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this todo',
      );
    }

    await this.todoRepository.delete(id);
    return `Todo with id ${id} is deleted`;
  }
}
