import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtSerivce: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    // const valid = user && (await bcrypt.compare(password, user.password));

    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtSerivce.sign(payload),
    };
  }

  async register(signupUserInput: CreateUserDto) {
    const usernameCheck = await this.usersService.findOneByUsername(
      signupUserInput.username,
    );
    const emailCheck = await this.usersService.findOneByEmail(
      signupUserInput.email,
    );

    if (usernameCheck) {
      throw new Error('Username already exists');
    }

    if (emailCheck) {
      throw new Error('Email already exists');
    }

    const password = await bcrypt.hash(signupUserInput.password, 10);

    return this.usersService.create({
      ...signupUserInput,
      password,
    });
  }
}
