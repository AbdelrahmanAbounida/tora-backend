import { Injectable } from '@nestjs/common';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EmailTemplateEnum } from '../constants/email-text.contants';

@Injectable()
export class SendEmailDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(EmailTemplateEnum)
  email_type: keyof typeof EmailTemplateEnum;
}

export class HandleEmailTemplateDTO {
  @IsEnum(EmailTemplateEnum)
  name: EmailTemplateEnum;
}
