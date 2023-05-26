import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string) {
    const userExist = await this.usersService.findByEmail(email);

    if (userExist) {
      throw new BadRequestException('User with this email already exist.');
    }

    const salt = await randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');
    const user = await this.usersService.create(email, result);
    return user;
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('wrong email or password,');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('wrong email or password,');
    }
    return user;
  }
}
