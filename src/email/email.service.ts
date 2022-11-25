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
        user: 'matheusvictorhenrique@gmail.com',
        pass: 'ttwmajspleekkald',
      },
    });

    await trasport.sendMail({
      from: 'Safe Move <matheusvictorhenrique@gmail.com>',
      to: `${email.to}`,
      subject: `${email.subject}`,
      html: `<h1>Olá guardião</h1> <p>${email.message}</p>`,
    });
  }
}
