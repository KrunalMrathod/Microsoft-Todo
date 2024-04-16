import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  saltOrRounds: number = 10;
  constructor(
    @InjectRepository(User)
    private userReposetory: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    const existingUserWithEmail = await this.userReposetory.findOneBy({
      email: user.email,
    });
    const existingUserWithUserName = await this.userReposetory.findOneBy({
      userName: user.userName,
    });

    if (existingUserWithEmail) {
      throw new ConflictException('Email is already registered.');
    }

    if (existingUserWithUserName) {
      throw new ConflictException('Username is already taken.');
    }

    const hasspass = await bcrypt.hash(user.password, this.saltOrRounds);
    let data = {
      ...user,
      password: hasspass,
    };
    return this.userReposetory.save(data);
  }

  async findAllUser(): Promise<User[]> {
    return this.userReposetory.find();
  }

  async findOneUser(id: number): Promise<User | undefined> {
    return this.userReposetory.findOneBy({ id });
  }

  async updateUser(id: number, user: User): Promise<User> {
    await this.userReposetory.update(id, user);
    return this.findOneUser(id);
  }

  async deleteUser(id: number): Promise<string> {
    await this.userReposetory.delete(id);
    return `User with ID ${id} is deleted.`;
  }

  async findOneByUserName(userName: string): Promise<User> {
    return this.userReposetory.findOneBy({ userName });
  }
}
