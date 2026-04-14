import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}
  async sendEmail(
    recipient: string,
    subject: string,
    text: string,
    attachments: any[],
  ) {
    let transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST'),
      port: this.configService.get('EMAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    });

    let mailOptions = {
      from: '"Shiksha Study" <vishvendrachoudhary32@gmail.com>',
      to: recipient,
      subject: subject,
      text: text,
      attachments,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  }
}
