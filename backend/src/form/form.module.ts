import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { SubmissionController } from './submissition.controller';

@Module({
  controllers: [FormController, SubmissionController],
  providers: [FormService],
})
export class FormModule {}
