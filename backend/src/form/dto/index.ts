import { createZodDto } from 'nestjs-zod';
import * as z from 'zod';

export const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export class CreateFormDto extends createZodDto(formSchema) {}

export const saveFormSchema = z.object({
  fields: z.string(),
});
export class SaveFormDto extends createZodDto(saveFormSchema) {}
