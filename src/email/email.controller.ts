import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailDTO } from './dto/send-emai.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendMailer(@Body() email: SendEmailDTO) {
    await this.emailService.sendEmail(email);
  }
}
