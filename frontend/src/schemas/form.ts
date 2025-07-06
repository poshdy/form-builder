import * as z from "zod";

export const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});
export const saveSchema = z.object({
  fields: z.string(),
});

export const updateFormSchema = formSchema.partial();

export type FormPayload = z.infer<typeof formSchema>;
export type SaveFormPayload = z.infer<typeof saveSchema>;
export type UpdateFormPayload = z.infer<typeof updateFormSchema>;
