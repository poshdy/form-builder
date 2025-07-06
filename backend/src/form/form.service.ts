import { Injectable, Logger } from '@nestjs/common';
import { DatabaseConnection } from 'src/core/database/database_connection';
// import { CreateFormPayload, UpdateFormPayload } from './dto';
import { UserTokenPayload } from 'src/core/types';
import { ApplicationError } from 'src/lib/application.error';
import { CreateFormDto } from './dto';

type FormId = {
  formId: string;
};

type FormMutation = FormId & { user: UserTokenPayload };

@Injectable()
export class FormService {
  private readonly logger = new Logger(FormService.name);
  constructor(private readonly database: DatabaseConnection) {}
  async createForm({
    payload,
    user,
  }: {
    payload: CreateFormDto;
    user: UserTokenPayload;
  }) {
    const { accountId } = user;
    const { description, title } = payload;

    try {
      return await this.database.form.create({
        data: { title, accountId, description },
      });
    } catch (err) {
      this.logger.error({ err });
    }
  }
  async getForms({ accountId }: UserTokenPayload) {
    try {
      return await this.database.form.findMany({
        where: { accountId },
      });
    } catch (error) {
      this.logger.error({ error });
    }
  }
  async getForm({ user, formId }: FormMutation) {
    try {
      return await this.database.form.findUnique({
        where: { id: formId },
      });
    } catch (error) {
      this.logger.error({ error });
    }
  }
  async saveForm({ data, formId }: { formId: string; data: string }) {
    try {
      return await this.database.form.update({
        where: { id: formId },
        data: {
          fields: data,
        },
      });
    } catch (error) {
      this.logger.error({ error });
    }
  }
  async updateForm({
    formId,
    user,
    description,
    title,
  }: FormMutation & CreateFormDto) {
    try {
      return await this.database.form.update({
        where: { id: formId, accountId: user.accountId },
        data: {
          title,
          description,
        },
      });
    } catch (error) {
      this.logger.error({ error });
    }
  }
  async deleteForm({ formId, user }: FormMutation) {
    try {
      if (!formId) {
        throw new ApplicationError('form ID is missing');
      }
      return await this.database.form.update({
        where: { id: formId, accountId: user.accountId },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      this.logger.error({ error });
    }
  }
  async formStats({ accountId }: UserTokenPayload): Promise<{
    submissionRate: number;
    bounceRate: number;
    submissions: number;
    visits: number;
  }> {
    try {
      const stats = await this.database.form.aggregate({
        _sum: { submissions: true, visits: true },
      });

      const submissions = stats._sum.submissions ?? 0;
      const visits = stats._sum.visits ?? 0;

      const submissionRate = (submissions / visits) * 100;
      const bounceRate = 100 - submissionRate;

      return {
        submissionRate: isNaN(submissionRate) ? 0 : submissionRate,
        bounceRate: isNaN(bounceRate) ? 0 : bounceRate,
        submissions,
        visits,
      };
    } catch (error) {
      this.logger.error({ error });
    }
  }
}
