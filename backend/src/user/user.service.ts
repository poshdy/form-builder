import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DATABASE_CONNECTION } from 'src/core/database/database_connection';
import { NeonDatabase } from 'drizzle-orm/neon-serverless';
import * as users from './user.schema';
import { AccountService } from 'src/core/account/account.service';
import { signUpPayload } from 'src/core/auth/dto';
import { eq } from 'drizzle-orm';
import { ApplicationError } from 'src/lib/application.error';

@Injectable()
export class UserService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NeonDatabase<typeof users>,

    private readonly accountService: AccountService,
  ) {}

  async getUser(id: string) {
    if (!id) {
      throw new ApplicationError('user id is missing');
    }
    const user = await this.database
      .select()
      .from(users.users)
      .where(eq(users.users.id, id));

    if (!user || user.length === 0) {
      throw new NotFoundException('User is not found');
    }
    return user[0];
  }
  async createUser(
    payload: Omit<signUpPayload, 'password' | 'email'>,
  ): Promise<users.InferUserInsertion> {
    const { firstName, lastName } = payload;
    const result = await this.database
      .insert(users.users)
      .values({ firstname: firstName, lastname: lastName })
      .returning();

    return result[0];
  }

  async getAccounts(userId: string) {
    return await this.database.query.users.findMany({
      where: eq(users.users.id, userId),
      with: { accounts: true },
    });
  }
}
