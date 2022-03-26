import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const valid = user && (await bcrypt.compare(password, user.password));

    if (valid) {
      const { password, username, ...rest } = user;
      return rest;
    }

    return null;
  }
}
