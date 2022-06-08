import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @Get('userId/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.gamesService.findAllByUserId(+userId);
  }

  @Post()
  create(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.create(createGameDto);
  }
}
