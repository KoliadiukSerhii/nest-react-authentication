import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
import { AuthDto } from '../user/dto/auth.dto';
import { LoginDto } from '../user/dto/login.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: LoginDto) {
    const validUser = await this.validateUser(user);

    const jwtToken = await this.generateToken(validUser);

    return jwtToken;
  }

  async register(user: AuthDto) {
    const userExists = await this.userService.findOne(user.email);

    if (userExists) {
      throw new BadRequestException('A user with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 12);

    const newUser = await this.userService.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });

    const jwtToken = await this.generateToken(newUser);

    return jwtToken;
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token');

    return res.send({ message: 'logout successful' });
  }

  private async validateUser(user: LoginDto) {
    const foundUser = await this.userService.findOne(user.email);

    const passwordEquals = await bcrypt.compare(
      user.password,
      foundUser.password,
    );

    if (foundUser && passwordEquals) {
      return foundUser;
    }

    throw new UnauthorizedException({ message: 'Invalid credetials' });
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, name: user.name, email: user.email };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.PRIVATE_KEY,
    });

    return token;
  }
}
