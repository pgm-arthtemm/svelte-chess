import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':username')
  @ApiOperation({ summary: 'Find user by username' })
  @ApiOkResponse({ description: 'User found', type: User })
  @ApiNoContentResponse({ description: 'User not found' })
  findOne(username: string) {
    return this.usersService.findOne(username);
  }

  @Get('/email/:email')
  findOneByEmail(email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Post('/')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
