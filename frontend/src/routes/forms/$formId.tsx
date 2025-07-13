import { getForm, getFormSubmissions } from "@/api/data-access/form";
import NavigationBar from "@/components/Header";
import { Loader } from "@/components/Loader";
import { FormStatsCard } from "@/components/pages/forms/stats-card";
import { SubmissionModal } from "@/components/pages/forms/submissions.modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { timeDistance } from "@/lib/dayjs";
import type { FormSubmission } from "@/types/forms";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { BarChart3, Eye, MousePointer, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/forms/$formId")({
  beforeLoad(ctx) {
    const user = ctx.context.auth?.user;
    if (!user) {
      throw redirect({
        to: "/auth/login",
      });
    }
  },

  component: FormDetails,
});

function FormDetails() {
  const { formId } = Route.useParams();
  const { data, isLoading, isPending, isFetching } = useQuery({
    queryKey: ["form", formId],
    queryFn: async () => await getForm(formId),
    enabled: !!formId,
  });

  if (isPending || isFetching || isLoading) {
    return (
      <div className="w-full h-screen flex items-center  justify-center">
        <Loader className="flex items-center justify-center" size={20} />;
      </div>
    );
  }

  console.log({ data });
  return (
    <div className="min-h-screen  ">
      <NavigationBar />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {data?.title} Form
          </h1>
          <p className="text-muted-foreground">track form performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <FormStatsCard
            title="Total Submissions"
            value={data?.submissions}
            Icon={Send}
          />
          <FormStatsCard title="Total Visits" value={data?.visits} Icon={Eye} />
          <FormStatsCard
            title="Submission Rate"
            value={data?.submissionRate}
            Icon={BarChart3}
          />
          <FormStatsCard
            title="Bounce Rate"
            value={data?.bounceRate}
            Icon={MousePointer}
          />
        </div>

        <div className="space-y-6">
          <SubmissionTable formTitle={data?.title as string} formId={formId} />
        </div>
      </main>
    </div>
  );
}

const SubmissionTable = ({
  formId,
  formTitle,
}: {
  formId: string;
  formTitle: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeResponse, setActiveResponse] = useState<FormSubmission | null>(
    null
  );
  const { data, isPending } = useQuery({
    queryKey: ["form-submission", formId],
    queryFn: async () => await getFormSubmissions(formId),

    enabled: !!formId,
  });

  return (
    <div className="border p-2 rounded-xl">
      {isPending ? (
        <div className="w-full h-[50vh] border rounded-xl flex items-center justify-center">
          <Loader className="" size={15} />
          <p>Please wait!</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm font-semibold text-muted-foreground">
                Name
              </TableHead>
              <TableHead className="text-sm font-semibold text-muted-foreground">
                Email
              </TableHead>
              <TableHead className="text-sm font-semibold text-muted-foreground">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((submission, idx) => (
              <TableRow
                className="text-secondary-foreground/90"
                onClick={() => {
                  setActiveResponse(submission);
                  setOpen(true);
                }}
                key={idx}
              >
                <TableCell>
                  {submission.values.find((val) => val.type == "NameField")
                    ?.answer ?? "Anonymus"}
                </TableCell>
                <TableCell>
                  {submission.values.find((val) => val.type == "EmailField")
                    ?.answer ?? "Anonymus"}
                </TableCell>
                <TableCell>{timeDistance(submission.submittedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {data && open && activeResponse && (
        <SubmissionModal
          formTitle={formTitle}
          open={open}
          onClose={() => setOpen(false)}
          response={activeResponse}
          responses={data}
        />
      )}
    </div>
  );
};
