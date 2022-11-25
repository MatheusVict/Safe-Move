import { IsNotEmpty } from 'class-validator';

export class SendEmailDTO {
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  message: string;
}
