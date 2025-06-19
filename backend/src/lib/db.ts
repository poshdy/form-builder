import { sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';

export const timestampCols = {
  createdAt: timestamp('created_at', {
    precision: 3,
    withTimezone: false,
  }).default(sql`now()`),
  updatedAt: timestamp('updated_at', {
    precision: 3,
    withTimezone: false,
  }).default(sql`now()`),

  deletedAt: timestamp('deleted_at', {
    precision: 3,
    withTimezone: false,
  }),
};
