export type FormStatsWithRate = {
  submissionRate: number;
  bounceRate: number;
} & FormStats;

type FormStats = {
  visits: number;
  submissions: number;
};

export type Form = {
  id: string;
  accountId: string;
  title: string;
  description?: string;

  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;

  fields: string;
} & FormStats;
