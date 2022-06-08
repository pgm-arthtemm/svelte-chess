import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  whitePlayer: string;

  @IsString()
  @IsNotEmpty()
  blackPlayer: string;

  @IsString()
  @IsNotEmpty()
  winner: string;

  @IsString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  moves: string;

  @IsNumber()
  @IsNotEmpty()
  userId?: number;
}
