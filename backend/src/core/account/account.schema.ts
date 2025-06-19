import { relations, sql } from 'drizzle-orm';
import { pgTable, uuid, text, varchar } from 'drizzle-orm/pg-core';
import { form } from 'src/form/form.schema';
import { timestampCols } from 'src/lib/db';
import { users } from 'src/user/user.schema';

const accounts = pgTable('accounts', {
  accountId: uuid('account_id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid('user_id'),
  email: varchar('email').notNull().unique(),
  password: text('password'),
  refreshToken: text('refresh_token'),
  provider: text('provider').default('credentials').notNull(),
  ...timestampCols,
});

const accountUserRelation = relations(accounts, ({ one, many }) => ({
  user: one(users, {
    fields: [accounts?.userId],
    references: [users.id],
  }),

  form: many(form, { relationName: 'accountForms' }),
}));

export { accounts, accountUserRelation };
