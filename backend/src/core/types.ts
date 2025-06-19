export type UserTokenPayload = {
  userId: string;
  accountId: string;
  email: string;
  refreshToken?: string;
};
