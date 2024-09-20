import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { AwsModule } from 'src/common/aws/aws.module';
import { EmailController } from './email.controller';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports: [AwsModule],
})
export class EmailModule {}
