import { viewForm } from "@/api/actions/form";
import { getForm } from "@/api/data-access/form";
import type { CustomElementInstance } from "@/builder/FormElements";
import { Loader } from "@/components/Loader";
import { FormComponent } from "@/components/pages/builder/form-component";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/submission/$formId")({
  component: RouteComponent,
  beforeLoad: async (ctx) => {
    const formId = ctx.params.formId;
    const localStorage = window.localStorage.getItem(formId);

    const formData = localStorage
      ? (JSON.parse(localStorage) as {
          viewed: boolean;
          submitted: boolean;
        })
      : null;

    if (formData?.submitted) {
      throw redirect({ to: "/submission/already-submitted" });
    }

    if (!formData?.viewed) {
      window.localStorage.setItem(
        formId,
        JSON.stringify({ viewed: true, submitted: false })
      );

      await viewForm(formId);
    }
  },
});

function RouteComponent() {
  const { formId } = Route.useParams();
  const form = useQuery({
    queryKey: ["form", formId],
    queryFn: async () => await getForm(formId),
  });

  if (form.isLoading || form.isPending) {
    return (
      <Loader className="h-screen flex items-center justify-center" size={25} />
    );
  }

  if (!form.data) {
    return notFound();
  }

  return (
    <main className="flex flex-col md:w-[60%] w-[85%] mx-auto gap-3 py-5">
      <div className="py-4">
        <h1 className="font-semibold text-2xl">{form.data.title}</h1>
        {form.data.description && (
          <p className="text-sm text-muted-foreground">
            {form.data.description}
          </p>
        )}
      </div>
      <Separator />

      <div className="w-full">
        <FormComponent
          formId={form.data.id}
          isPreview={false}
          elements={JSON.parse(form.data.fields) as CustomElementInstance[]}
        />
      </div>
    </main>
  );
}
