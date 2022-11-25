import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { MessageHelper } from '../../helpers/message.helpers';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException(MessageHelper.Password_Or_Email_Invalid);
    }
    return user;
  }
}
