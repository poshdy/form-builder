import type {
  FormElementInstance,
  FormElementType,
} from "@/builder/FormElements";

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
export type FormSubmission = {
  submittedAt: Date;

  values: SubmissionValues[];
};

export type SubmissionValues = {
  question: string;
  type: FormElementType;
  answer: string;
};

export type ElementInstanceProps = {
  elementInstance: FormElementInstance;
};

export type SubmitValue = {
  submitValue: ({
    key,
    value,
    type,
  }: {
    key: string;
    value: string;
    type: FormElementType;
  }) => void;
};
