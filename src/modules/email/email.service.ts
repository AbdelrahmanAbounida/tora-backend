import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AwsSesService } from 'src/common/aws/services/aws.ses.service';
import { EmailTemplateEnum, EmailTexts } from './constants/email-text.contants';
import { getTemplate } from './email-templates';
import { CreateTemplateCommandOutput } from '@aws-sdk/client-ses';
import { SendEmailDTO } from './dto/send-email.dto';
import { SendSESEmailDTO } from 'src/common/aws/dtos/ses.dto';
import { CustomResponse } from 'src/common/response/custom-response';

@Injectable()
export class EmailService {
  private readonly fromEmail: string;

  constructor(
    private readonly awsSESService: AwsSesService,
    private readonly configService: ConfigService,
  ) {
    this.fromEmail = this.configService.get<string>('aws.ses_from_mail');
  }

  async getTemplate({ name }: { name: keyof typeof EmailTemplateEnum }) {
    const template = await this.awsSESService.getTemplate({ name });
    return template.Template;
  }

  async createEmailTemplate({
    name,
  }: {
    name: keyof typeof EmailTemplateEnum;
  }) {
    const template = getTemplate({
      template: name,
      url: '{{url}}',
      userEmail: '{{userEmail}}',
    });

    const res = await this.awsSESService.createTemplate({
      htmlBody: template,
      templateName: name,
      templateSubject: name,
      textBody: EmailTexts[name],
      // readFileSync(
      //     './templates/email.change-password.template.html',
      //     'utf8'
      // ),
    });
    return res;
  }

  async sendTestVerify() {
    const res = await this.awsSESService.send({
      sender: 'abdelrahmanaboneda@gmail.com',
      templateName: 'REGISTER',
      templateType: EmailTemplateEnum.REGISTER,
      ToAddresses: ['abdelrahmanaboneda@gmail.com'],

      // input data
      url: 'tora.com',
      link: '123213', // otp
    });
    return res;
  }
  async sendTestForget() {
    const res = await this.awsSESService.send({
      sender: 'abdelrahmanaboneda@gmail.com',
      templateName: 'FORGET_PASSWORD',
      templateType: EmailTemplateEnum.FORGET_PASSWORD,
      ToAddresses: ['abdelrahmanaboneda@gmail.com'],
      url: 'tora.com',
      link: '123213',
    });
    return res;
  }

  async updateEmailTemplate({
    name,
  }: {
    name: keyof typeof EmailTemplateEnum;
  }) {
    const email_template = getTemplate({
      template: name,
      url: '{url}',
      userEmail: '{userEmail}',
    });
    const res = await this.awsSESService.updateTemplate({
      htmlBody: email_template,
      templateName: name,
      templateSubject: name,
      textBody: EmailTexts[name],
    });

    return new CustomResponse({
      message: 'Email template updated successfully',
      error: false,
    });
  }

  async deleteEmailTemplate({
    name,
  }: {
    name: keyof typeof EmailTemplateEnum;
  }) {
    try {
      const res = await this.awsSESService.deleteTemplate({ name });
      return new CustomResponse({
        message: 'Template deleted successfully',
        error: false,
      });
    } catch (error) {
      console.log({ error });

      return new InternalServerErrorException('Something went wrong ');
    }
  }
}
