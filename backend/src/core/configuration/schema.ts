import * as z from 'zod';

export const EnvSchema = z.object({
  DATABASE_URL: z.string(),
  DEVELOPMENT_DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  NODE_ENV: z.string(),
});
