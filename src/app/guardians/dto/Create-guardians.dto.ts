import { IsNotEmpty, Matches } from 'class-validator';
import { UserEntity } from 'src/app/user/User.entity';
import { MessageHelper } from 'src/helpers/message.helpers';
import { RegexHelper } from 'src/helpers/regex.helpers';

export class CreateGuardiansDTO {
  @IsNotEmpty()
  guardianName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Matches(RegexHelper.password, {
    message: MessageHelper.Password_Or_Email_Invalid,
  })
  password: string;

  @IsNotEmpty()
  user: Partial<UserEntity>;
}
