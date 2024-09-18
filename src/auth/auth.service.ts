import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async signIn(username: String, pass: string): Promise<{ access_token: String }> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isMatch = await bcrypt.compare(pass, user.password.toString());

    if (!isMatch) {
      throw new UnauthorizedException('Senha incorreta');
    }
      
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}