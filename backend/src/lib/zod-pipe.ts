import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import * as z from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const parsedValues = this.schema.parse(value);

      console.log({ parsedValues });
      return parsedValues;
    } catch (error) {
      console.log({ error });
      if (error instanceof z.ZodError) {
        const formattedErrors = error.flatten();

        throw new BadRequestException({
          name: error.name,
          message: error.message,
          description: formattedErrors,
          issue: error.issues,
        });
      }
    }
  }
}
