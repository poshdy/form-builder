import { relations } from 'drizzle-orm';
import { pgTable, uuid, timestamp, varchar } from 'drizzle-orm/pg-core';
import { accounts } from 'src/core/account/account.schema';

const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstname: varchar('first_name').notNull(),
  lastname: varchar('last_name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

const userAccountsRelation = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export type InferUserInsertion = typeof users.$inferInsert;

export { users, userAccountsRelation };
