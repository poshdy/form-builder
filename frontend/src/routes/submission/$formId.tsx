import { submitForm, viewForm } from "@/api/actions/form";
import { getForm } from "@/api/data-access/form";
import {
  FormElements,
  type CustomElementInstance,
  type FormElementInstance,
} from "@/builder/FormElements";
import { Loader } from "@/components/Loader";
import { FormComponent } from "@/components/pages/builder/form-component";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { useRef } from "react";

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

  const formValues = useRef<{ [key: string]: string }>({});
  if (form.isLoading || form.isPending) {
    return (
      <Loader className="h-screen flex items-center justify-center" size={25} />
    );
  }

  if (!form.data) {
    return notFound();
  }

  const submitValue = ({ key, value }: { key: string; value: string }) => {
    formValues.current[key] = value;
  };
  const submit = () => {
    console.log({ values: formValues.current });
  };

  const fields = JSON.parse(form.data.fields) as CustomElementInstance[];

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

      <div className="w-full space-y-2">
        {fields.map((element) => {
          const FormElementComponent = FormElements[element.type].formComponent;

          return (
            <FormElementComponent
              // validateField={validateField}
              submitValue={submitValue}
              elementInstance={element}
            />
          );
        })}
      </div>
      <Button
        onClick={submit}
        className="w-full"
        type="button"
        variant={"default"}
      >
        Submit
      </Button>
    </main>
  );
}
