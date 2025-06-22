import * as z from "zod";

export const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export const updateFormSchema = formSchema.partial();

export type FormPayload = z.infer<typeof formSchema>;
export type UpdateFormPayload = z.infer<typeof updateFormSchema>;
