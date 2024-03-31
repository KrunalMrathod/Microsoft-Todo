import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
 
  constructor(
    @InjectRepository(User)
    private userReposetory: Repository<User>,
  ) {}

  async createUser(user:User): Promise<User> {
    return this.userReposetory.save(user)
  }

  async findAllUser(): Promise<User[]> {
    return this.userReposetory.find();
  }

  async findOneUser(id:number) :Promise<User | undefined> {
    return this.userReposetory.findOneBy({id})
  }

  async updateUser(id:number,user:User): Promise<User> {
    await this.userReposetory.update(id,user);
    return this.findOneUser(id)
  }

  async deleteUser(id:number):Promise<string> {
    await this.userReposetory.delete(id);
    return `User with ID ${id} is deleted.`;
  }

}
