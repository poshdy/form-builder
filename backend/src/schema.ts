import { users } from './user/user.schema';
import { accounts } from './core/account/account.schema';
import { form, formSubmission } from './form/form.schema';
import { timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export default {
  users,
  accounts,
  form,
  formSubmission,
};
