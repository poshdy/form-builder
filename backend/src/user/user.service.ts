import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseConnection } from 'src/core/database/database_connection';

import { AccountService } from 'src/core/account/account.service';
import { signUpPayload } from 'src/core/auth/dto';
import { ApplicationError } from 'src/lib/application.error';

@Injectable()
export class UserService {
  constructor(private readonly database: DatabaseConnection) {}

  async getUser(id: string) {
    if (!id) {
      throw new ApplicationError('user id is missing');
    }
    return this.database.user.findUnique({
      where: {
        id,
      },
    });
  }
  async createUser(payload: Omit<signUpPayload, 'password' | 'email'>) {
    const { firstName, lastName } = payload;
    return this.database.user.create({ data: { firstName, lastName } });
  }

  async getAccounts(userId: string) {
    return await this.database.user.findMany({
      where: { id: userId },
      include: { accounts: true },
    });
  }
}
