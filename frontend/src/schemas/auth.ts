import * as z from "zod";

export const baseAuthSchema = z.object({
  email: z.string().email({ message: "email is required" }),
  password: z
    .string({ message: "password is required" })
    .min(8, { message: "password is too short" }),
});

export const signUpSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
  })
  .merge(baseAuthSchema);

export const loginSchema = baseAuthSchema;

export type signUpPayload = z.infer<typeof signUpSchema>;
export type loginPayload = z.infer<typeof loginSchema>;
