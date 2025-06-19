import { EnvSchema } from './schema';

export default async () => {
  const env = await EnvSchema.parseAsync(process.env);
  if (!env) {
    throw new Error('CONFIG NOT FOUND');
  }

  return {
    port: parseInt(process.env.PORT, 10) || 5050,
    auth: {
      accessTokenSecret: env.ACCESS_TOKEN_SECRET,
      refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
    },
    database: {
      url:
        env.NODE_ENV === 'dev'
          ? env.DEVELOPMENT_DATABASE_URL
          : env.DATABASE_URL,
    },
    env: process.env.NODE_ENV,
  };
};
