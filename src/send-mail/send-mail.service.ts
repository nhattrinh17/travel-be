import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailCustomDto, SendEmailHomeDto, SendMailBookingCruiseDto, SendMailBookingTourDto, SendMailDto } from './send-mail.entity';

@Injectable()
export class SendMailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(dto: SendMailDto, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: dto.sendTo,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Thông báo quyết định chấm dứt hợp đồng',
      template: './default_sendMail', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        ...dto,
      },
    });
  }

  async sendEmailCustom(dto: SendEmailCustomDto) {
    return this.mailerService.sendMail({
      to: dto.sendTo,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: dto.subject,
      html: dto.content,
    });
  }

  async sendMailHome(dto: SendEmailHomeDto) {
    return this.mailerService.sendMail({
      to: process.env.MAIL_TO_DEFAULT,
      subject: dto.subject || 'Help Customer',
      template: './email-home',
      context: {
        ...dto,
      },
    });
  }

  async sendMailBookingCruise(dto: SendMailBookingCruiseDto) {
    return this.mailerService.sendMail({
      to: dto.email,
      subject: 'Request Booking Cruise',
      template: './booking_cruise_email',
      context: {
        ...dto,
      },
    });
  }

  async sendMailBookingTour(dto: SendMailBookingTourDto) {
    return this.mailerService.sendMail({
      to: dto.email,
      subject: 'Request Booking Tour',
      template: './booking_tour_email',
      context: {
        ...dto,
      },
    });
  }
}
