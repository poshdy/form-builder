import { Injectable, Logger } from '@nestjs/common';
import { DatabaseConnection } from 'src/core/database/database_connection';
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
      const form = await this.database.form.findUnique({
        where: { id: formId },
      });

      const visits = form.visits ?? 0;
      const submissions = form.submissions ?? 0;
      const { submissionRate, bounceRate } = await this.calculateFormStats({
        submissions,
        visits,
      });

      return {
        ...form,
        submissions,
        visits,
        submissionRate,
        bounceRate,
      };
    } catch (error) {
      this.logger.error({ error });
    }
  }
  async getFormSubmissions({ user, formId }: FormMutation) {
    try {
      const form = await this.database.formSubmission.findMany({
        where: { formId: formId },
      });

      const submissions = form.map((submission) => {
        const { submittedAt, values } = submission;

        const parsedValues = JSON.parse(values) as {
          question: string;
          answer: string;
          type: string;
        }[];
        return {
          values: parsedValues,
          submittedAt,
        };
      });

      return submissions;
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
  async submitForm({ values, formId }: { formId: string; values: string }) {
    try {
      return await this.database.$transaction(async (tx) => {
        await tx.formSubmission.create({
          data: {
            values,
            formId,
          },
        });
        await tx.form.update({
          where: { id: formId },
          data: { submissions: { increment: 1 } },
        });
      });
    } catch (error) {
      this.logger.error({ error });
    }
  }
  async updateForm({
    formId,

    description,
    title,
  }: {
    formId: string;
    title: string | undefined;
    description: string | undefined;
  }) {
    try {
      return await this.database.form.update({
        where: { id: formId },
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

      const { submissionRate, bounceRate } = await this.calculateFormStats({
        submissions,
        visits,
      });

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

  async formVisit(formId: string) {
    try {
      return await this.database.form.update({
        where: { id: formId },
        data: { visits: { increment: 1 } },
      });
    } catch (error) {
      this.logger.error({ error });
    }
  }

  private async calculateFormStats({
    submissions,
    visits,
  }: {
    submissions: number;
    visits: number;
  }) {
    try {
      const submissionRate = (submissions / visits) * 100;
      const bounceRate = 100 - submissionRate;

      return {
        submissions,
        visits,
        submissionRate,
        bounceRate,
      };
    } catch (error) {
      this.logger.error({ error });
    }
  }
}
