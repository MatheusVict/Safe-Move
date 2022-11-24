import { IsNotEmpty, Matches } from 'class-validator';
import { MessageHelper } from 'src/helpers/message.helpers';
import { RegexHelper } from 'src/helpers/regex.helpers';

export class UpdateUserDTO {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @Matches(RegexHelper.password, {
    message: MessageHelper.Password_Or_Email_Invalid,
  })
  password: string;
}
