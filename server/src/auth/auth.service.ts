import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    userName: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByUserName(userName);

    if (user?.password !== pass) {
      throw new UnauthorizedException('userEmail or password Must be wrong');
    }

    const payload = { sub: user.id, userName: user.userName };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
