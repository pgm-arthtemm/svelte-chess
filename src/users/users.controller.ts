import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  findOne(id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post('/')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
