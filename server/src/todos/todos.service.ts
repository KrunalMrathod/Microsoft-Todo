import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {

 constructor(
  @InjectRepository(Todo)
  private todoRepository: Repository<Todo>
 ) {}

  async createTodo(todo:Todo):Promise<Todo> {
    return this.todoRepository.save(todo)
  }

  async findAllTodo(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOneTodo(id:number) :Promise<Todo | undefined> {
    return this.todoRepository.findOneBy({id});
  }

  async updateTodo(id:number,todo:Todo): Promise<Todo> {
    await this.todoRepository.update(id,todo);
    return this.findOneTodo(id);
  }


  async deleteTodo(id:number): Promise<string> {
    await this.todoRepository.delete(id);
    return `Todo with id ${id} is Deleted`
  }

}
