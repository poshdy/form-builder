import type { CustomElementInstance } from "@/builder/FormElements";
import * as z from "zod";

export type SubmitFormValues = z.infer<ReturnType<typeof generateSchema>>;

export function generateSchema(elements: CustomElementInstance[]) {
  let schema = {} as Record<string, any>;

  elements.forEach((element) => {
    const validation =
      element.type == "NumberField"
        ? z.coerce.number()
        : element.type == "MultiChoice"
          ? z.string().array()
          : z.string();
    const label = element.extraAttributes.label;

    const field = {
      [label]: element.extraAttributes.required
        ? validation
        : validation.optional(),
    };

    schema = { ...schema, ...field };
  });

  return z.object(schema);
}
