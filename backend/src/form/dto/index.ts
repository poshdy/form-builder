import { createZodDto } from 'nestjs-zod';
import * as z from 'zod';

export const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export const updateFormSchema = formSchema.partial();

export class CreateFormDto extends createZodDto(formSchema) {}
export class UpdateFormDto extends createZodDto(updateFormSchema) {}

export const saveFormSchema = z.object({
  fields: z.string(),
});
export const submitFormSchema = z.object({
  values: z.string(),
});

export class SaveFormDto extends createZodDto(saveFormSchema) {}
export class SubmitFormDto extends createZodDto(submitFormSchema) {}
