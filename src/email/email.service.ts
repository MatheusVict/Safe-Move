import { Injectable } from '@nestjs/common';
import { SendEmailDTO } from './dto/send-emai.dto';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmail(email: SendEmailDTO) {
    const trasport = await createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.PASS_MAIL,
      },
    });

    await trasport.sendMail({
      from: `Safe Move <${process.env.EMAIL_FROM}>`,
      to: `${email.to}`,
      subject: `${email.subject}`,
      html: `<h1>Olá guardião</h1> <p>${email.message}</p>`,
    });
  }
}
