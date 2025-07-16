import { submitForm, viewForm } from "@/api/actions/form";
import { getFormContent } from "@/api/data-access/form";
import {
  FormElements,
  type CustomElementInstance,
  type FormElementType,
} from "@/builder/FormElements";
import { Loader } from "@/components/Loader";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { useRef } from "react";
import { toast } from "sonner";

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
    queryKey: ["form-content", formId],
    queryFn: async () => await getFormContent(formId),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: string }) =>
      await submitForm(id, values),
  });

  const formValues = useRef<{ [key: string]: Record<string, any> }>({});

  if (form.isLoading || form.isPending) {
    return (
      <Loader className="h-screen flex items-center justify-center" size={25} />
    );
  }

  if (!form.data) {
    return notFound();
  }

  const submitValue = ({
    key,
    value,
    type,
  }: {
    key: string;
    value: string;
    type: FormElementType;
  }) => {
    formValues.current[key] = { value, type };
  };

  const fields = JSON.parse(form.data.fields) as CustomElementInstance[];

  const handleSubmit = async () => {
    if (formId) {
      const values = formValues.current;
      const valuesArr = Object.entries(values);

      const submissions = valuesArr.map(([key, value]) => {
        const { type, value: val } = value as {
          value: string;
          type: FormElementType;
        };
        return {
          type,
          question: key,
          answer: val ?? "No Answer Given",
        };
      });

      const data = JSON.stringify(submissions);
      await mutateAsync(
        {
          id: formId,
          values: data,
        },
        {
          onSuccess() {
            // redirect to success page
            window.localStorage.removeItem(formId);

            window.localStorage.setItem(
              formId,
              JSON.stringify({ viewed: true, submitted: true })
            );
            toast.success("Form Submitted Successfully!✅");
          },
        }
      );
    } else {
      console.log({ values: formValues.current });
      console.log({ message: "Form submitted successfully!" });
    }
  };

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

      <div className="w-full space-y-4">
        {fields.map((element) => {
          const FormElementComponent = FormElements[element.type].formComponent;

          return (
            <FormElementComponent
              key={element.id}
              submitValue={submitValue}
              elementInstance={element}
            />
          );
        })}
      </div>
      <Button
        onClick={handleSubmit}
        className="w-full"
        type="button"
        disabled={isPending}
        variant={"default"}
      >
        Submit
      </Button>
    </main>
  );
}
