import { relations, sql } from 'drizzle-orm';
import {
  integer,
  pgTable,
  timestamp,
  varchar,
  json,
} from 'drizzle-orm/pg-core';
import { accounts } from 'src/core/account/account.schema';
import { timestampCols } from 'src/lib/db';

const form = pgTable('form', {
  id: varchar()
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  accountId: varchar('account_id'),
  title: varchar().notNull(),
  description: varchar().notNull(),

  publishedAt: timestamp(),
  fields: json().$type<string[]>(),

  submissions: integer().default(0),
  visits: integer().default(0),

  publicUrl: varchar()
    .notNull()
    .default(sql`gen_random_uuid()`),

  ...timestampCols,
});

const formSubmission = pgTable('form_submission', {
  id: varchar()
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  formId: varchar().notNull(),

  email: varchar(),
  name: varchar(),
  submittedAt: timestamp(),
});

const formAccountRelation = relations(form, ({ one, many }) => ({
  account: one(accounts, {
    fields: [form.accountId],
    references: [accounts.accountId],
  }),
  submisstions: many(form),
}));

const submissionRelations = relations(formSubmission, ({ one }) => ({
  form: one(form, {
    fields: [formSubmission.formId],
    references: [form.id],
  }),
}));

export { form, formAccountRelation, formSubmission, submissionRelations };
