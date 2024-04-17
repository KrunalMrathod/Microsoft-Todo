import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userName: string, pass: string): Promise<{ access_token: string }> {
    try {
      const user = await this.userService.findOneByUserName(userName);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
  
      const isMatch = await bcrypt.compare(pass, user.password );
  
  
      if (!isMatch) {
        throw new UnauthorizedException('Invalid password');
      }
  
      const payload = { sub: user.id, userName: user.userName };
  
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  
  
  

}
