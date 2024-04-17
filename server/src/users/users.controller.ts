import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.usersService.updateUser(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.usersService.deleteUser(+id);
  }
}
