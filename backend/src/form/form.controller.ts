import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
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
import { CreateFormDto, SaveFormDto } from './dto';
import { ZodValidationPipe } from 'nestjs-zod';

@UseGuards(AuthenticationGuard)
@Controller('forms')
export class FormController {
  private readonly logger = new Logger(FormController.name);
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
  @Get(':formId')
  async getForm(
    @User() user: UserTokenPayload,
    @Param('formId') formId: string,
  ) {
    console.log({ formId });
    const form = await this.formService.getForm({ user, formId });

    return {
      data: form,
    };
  }
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

  @HttpCode(HttpStatus.OK)
  @Patch(':formId')
  async updateForm(@Param() formId: string, @Body() payload: any) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':formId')
  async deleteForm(@Param() formId: string) {}
}
