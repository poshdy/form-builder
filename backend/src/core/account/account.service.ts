import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database_connection';
import { NeonDatabase } from 'drizzle-orm/neon-serverless';
import * as accounts from './account.schema';
import { ApplicationError } from 'src/lib/application.error';
import { eq } from 'drizzle-orm';
import { AccountProvider } from '../auth/types';
import * as users from '../../user/user.schema';
@Injectable()
export class AccountService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NeonDatabase<typeof accounts>,
  ) {}

  async createAccount(payload: {
    userId: string;
    email: string;
    hashedPassword: string;
  }) {
    const { email, hashedPassword, userId } = payload;

    const newAccount = await this.database
      .insert(accounts.accounts)
      .values({
        email,
        provider: AccountProvider.Credentials,
        userId,
        password: hashedPassword,
      })
      .returning();

    return newAccount[0];
  }

  async get(userId: string) {
    if (!userId) {
      throw new ApplicationError('userId is missing');
    }

    return await this.database.query.accounts.findMany({
      with: { user: true },
      where: eq(accounts.accounts.userId, userId),
    });
  }
  async getOne(email: string) {
    if (!email) {
      throw new ApplicationError('email is missing');
    }

    const account = await this.database
      .select()
      .from(accounts.accounts)
      .where(eq(accounts.accounts.email, email));
    if (!account) {
      throw new NotFoundException('account not found');
    }

    return account[0];
  }

  async refreshTokenAction(
    action: 'update' | 'delete',
    email: string,
    token?: string,
  ) {
    if (!email) {
      throw new ApplicationError('Email is missing');
    }

    if (action == 'update' && !token) {
      throw new ApplicationError('update action requires a refresh token');
    }

    const result = await this.database
      .update(accounts.accounts)
      .set({ refreshToken: action == 'update' ? token : null })
      .returning();

    return result[0];
  }
}
