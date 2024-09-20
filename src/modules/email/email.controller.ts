import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  Patch,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailTemplateEnum } from './constants/email-text.contants';
import { Roles } from 'src/auth/guards/roles.guard';
import { USER_ROLE_ENUM } from '../users/constants/role.enum';
import { Public } from 'src/auth/guards/public.guard';
import { HandleEmailTemplateDTO } from './dto/send-email.dto';

// @Roles(USER_ROLE_ENUM.ADMIN)
@Public()
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('/template')
  async getTemplate(@Query() handleEmailTemplateDto: HandleEmailTemplateDTO) {
    const template = await this.emailService.getTemplate({
      name: handleEmailTemplateDto.name.toString() as keyof typeof EmailTemplateEnum,
    });

    return template;
  }

  @Post('/create')
  async createEmailTemplate(
    @Body() handleEmailTemplateDto: HandleEmailTemplateDTO,
  ) {
    const emailCreated = await this.emailService.createEmailTemplate({
      name: handleEmailTemplateDto.name.toString() as keyof typeof EmailTemplateEnum,
    });

    return emailCreated;
  }

  @Post('/test-verify')
  sendVerifyEmail() {
    const emailVerified = this.emailService.sendTestVerify();
    return emailVerified;
  }

  @Post('/test-forget')
  sendUpdatePassword() {
    const res = this.emailService.sendTestForget();
    return res;
  }

  // ::TODO:: >> finalize those routes
  @Patch('/update')
  updateEmailTemplate(@Body() handleEmailTemplateDto: HandleEmailTemplateDTO) {
    const emailUpdated = this.emailService.updateEmailTemplate({
      name: handleEmailTemplateDto.name,
    });
    return emailUpdated;
  }

  @Delete('/delete')
  deleteEmailTemplate(@Body() handleEmailTemplateDto: HandleEmailTemplateDTO) {
    const emailDeleted = this.emailService.deleteEmailTemplate({
      name: handleEmailTemplateDto.name,
    });

    return emailDeleted;
  }
}
