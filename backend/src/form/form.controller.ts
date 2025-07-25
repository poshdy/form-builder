import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { FormService } from './form.service';
import { AuthenticationGuard } from 'src/core/auth/guards';
import { User } from 'src/core/auth/decorators/user.decorator';
import { UserTokenPayload } from 'src/core/types';
import {
  CreateFormDto,
  SaveFormDto,
  UpdateFormDto,
  updateFormSchema,
} from './dto';
import { ZodValidationPipe } from 'nestjs-zod';

@UseGuards(AuthenticationGuard)
@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @UsePipes(ZodValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createForm(
    @Body() payload: CreateFormDto,
    @User() user: UserTokenPayload,
  ) {
    return await this.formService.createForm({ payload, user });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/stats')
  async getFormsStats(@User() user: UserTokenPayload) {
    const stats = await this.formService.formStats(user);

    return {
      data: stats,
    };
  }
  @HttpCode(HttpStatus.OK)
  @Get()
  async getForms(@User() user: UserTokenPayload) {
    const forms = await this.formService.getForms(user);
    return {
      data: forms,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get(':formId/submissions')
  async getFormSubmissions(
    @User() user: UserTokenPayload,
    @Param('formId') formId: string,
  ) {
    const form = await this.formService.getFormSubmissions({ user, formId });

    return {
      data: form,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get(':formId')
  async getForm(
    @User() user: UserTokenPayload,
    @Param('formId') formId: string,
  ) {
    const form = await this.formService.getForm({ formId });

    return {
      data: form,
    };
  }

  @UsePipes(ZodValidationPipe)
  @HttpCode(HttpStatus.OK)
  @Patch('/save/:formId')
  async saveForm(
    @User() user: UserTokenPayload,
    @Param('formId') formId: string,
    @Body() data: SaveFormDto,
  ) {
    const form = await this.formService.saveForm({ data: data.fields, formId });

    return {
      data: form,
    };
  }

  @UsePipes(ZodValidationPipe)
  @HttpCode(HttpStatus.OK)
  @Patch(':formId')
  async updateForm(
    @Param('formId') formId: string,
    @Body() payload: UpdateFormDto,
  ) {
    const { description, title } = payload;

    const updated = await this.formService.updateForm({
      formId,

      description,
      title,
    });

    return {
      data: updated,
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':formId')
  async deleteForm(@Param() formId: string) {}
}
