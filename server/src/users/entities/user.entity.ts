import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Role from 'src/enums/roles.enum';
import { Message } from 'src/messages/entities/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  // @Column({
  //   type: 'enum',
  //   enum: Role,
  //   default: Role.USER,
  // })
  // role: Role;
}
