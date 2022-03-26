import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import Role from 'src/enums/roles.enum';

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

  // @Column({
  //   type: 'enum',
  //   enum: Role,
  //   default: Role.USER,
  // })
  // role: Role;
}
