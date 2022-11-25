import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/app/user/User.entity';
import { UserService } from 'src/app/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: Partial<UserEntity>) {
    const payload = { id: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: UserEntity;

    try {
      user = await this.userService.getOne({
        where: { email },
      });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) return null;

    const { password: _, ...withoutPass } = user;

    return withoutPass;
  }
}
