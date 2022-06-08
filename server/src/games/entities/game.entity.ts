import { MoveType } from 'src/types/move.interface';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  moves: string;

  @Column()
  whitePlayer: string;

  @Column()
  blackPlayer: string;

  @Column()
  winner: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.games)
  user?: User;

  @Column({ nullable: true })
  userId?: number;
}
