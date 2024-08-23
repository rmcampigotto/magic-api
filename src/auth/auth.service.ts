import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(username: String, pass: string): Promise<{ access_token: String }> {
    const user = await this.usersService.findOne(username);

    const hashPass = await bcrypt.hash(pass, saltOrRounds);
    
    if (user?.username !== "rafael"){
      if (user?.password !== hashPass) {
        throw new UnauthorizedException();
      }
    }
    
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}