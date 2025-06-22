import { getForms, getFormStats } from "@/api/data-access/form";
import { Loader } from "@/components/Loader";
import { CreateUpdateFormModal } from "@/components/pages/forms/create-update-modal";
import { FormCard } from "@/components/pages/forms/form-card";
import { ModalTrigger } from "@/components/pages/forms/modal-trigger";
import { FormStatsCard } from "@/components/pages/forms/stats-card";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { BarChart3, Eye, MousePointer, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/forms")({
  beforeLoad(ctx) {
    if (!ctx.context.auth?.user) {
      console.log({ user: ctx.context.auth?.user });
      throw redirect({
        to: "/auth/login",
      });
    }
  },
  component: FormsLayout,
});

function FormsLayout() {
  const [open, setIsOpen] = useState<boolean>(false);

  const stats = useQuery({
    queryKey: ["form-stats"],
    queryFn: async () => await getFormStats(),
  });
  const forms = useQuery({
    queryKey: ["forms"],
    queryFn: async () => await getForms(),
  });

  if (stats.isPending)
    return (
      <Loader className="h-screen flex items-center justify-center" size={25} />
    );

  return (
    <div className="min-h-screen dark ">
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Forms</h1>
          <p className="text-muted-foreground">
            Manage your forms and track their performance
          </p>
        </div>

        {/* Stats Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <FormStatsCard
            title="Total Submissions"
            value={stats?.data?.submissions}
            Icon={Send}
          />
          <FormStatsCard
            title="Total Visits"
            value={stats?.data?.visits}
            Icon={Eye}
          />
          <FormStatsCard
            title="Submission Rate"
            value={stats?.data?.submissionRate}
            Icon={BarChart3}
          />
          <FormStatsCard
            title="Bounce Rate"
            value={stats?.data?.bounceRate}
            Icon={MousePointer}
          />
        </div>

        {/* Forms Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Your Forms
            </h2>
            <div className="text-sm text-muted-foreground">
              {forms?.data?.length} forms
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ModalTrigger setOpen={setIsOpen} />
            {forms?.data?.map((form) => <FormCard form={form} key={form.id} />)}
          </div>
        </div>

        {open && (
          <CreateUpdateFormModal onClose={() => setIsOpen(false)} open={open} />
        )}
      </main>
    </div>
  );
}
