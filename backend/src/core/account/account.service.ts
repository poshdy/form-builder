import { Injectable} from '@nestjs/common';
import { DatabaseConnection } from '../database/database_connection';
import { ApplicationError } from 'src/lib/application.error';

@Injectable()
export class AccountService {
  constructor(private readonly database: DatabaseConnection) {}

  async createAccount(payload: {
    userId: string;
    email: string;
    hashedPassword: string;
  }) {
    const { email, hashedPassword, userId } = payload;

    return this.database.account.create({
      data: {
        email,
        userId,
        password: hashedPassword,
      },
    });
  }

  async get(userId: string) {
    if (!userId) {
      throw new ApplicationError('userId is missing');
    }

    return this.database.account.findMany({
      where: {
        userId,
      },
    });
  }
  async getOne(email: string) {
    if (!email) {
      throw new ApplicationError('email is missing');
    }
    return await this.database.account.findUnique({ where: { email } });
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

    return this.database.account.update({
      where: {
        email,
      },
      data: {
        refreshToken: action == 'update' ? token : null,
      },
    });
  }
}
