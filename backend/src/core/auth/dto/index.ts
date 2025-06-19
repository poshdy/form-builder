import * as z from 'zod';

const baseSchema = z.object({
  email: z.string().email({ message: 'Email is Required' }),
  password: z.string({ message: 'Password is required' }).min(6).max(22),
});

export const signUpSchema = z
  .object({
    firstName: z.string({ message: 'First name is required' }),
    lastName: z.string({ message: 'Last name is required' }),
  })
  .merge(baseSchema);

export type signUpPayload = z.infer<typeof signUpSchema>;

export const loginSchema = baseSchema;

export type loginPayload = z.infer<typeof loginSchema>;
