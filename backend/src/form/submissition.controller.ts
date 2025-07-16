import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { FormService } from './form.service';
import { SubmitFormDto } from './dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('forms/submission')
export class SubmissionController {
  constructor(private readonly formService: FormService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':formId/content')
  async getFormContent(@Param('formId') formId: string) {
    const form = await this.formService.getForm({
      formId,
    });

    return {
      data: form,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':formId/visit')
  async visitForm(@Param('formId') formId: string) {
    return await this.formService.formVisit(formId);
  }

  @UsePipes(ZodValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  @Post('/:formId')
  async submitForm(
    @Param('formId') formId: string,
    @Body() payload: SubmitFormDto,
  ) {
    return await this.formService.submitForm({
      formId,
      values: payload.values,
    });
  }
}
