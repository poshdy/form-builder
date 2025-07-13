import { submitForm } from "@/api/actions/form";
import type { CustomElementInstance } from "@/builder/FormElements";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateSchema, type SubmitFormValues } from "@/lib/generate-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormComponentProps = {
  elements: CustomElementInstance[];
  isPreview: boolean;
  formId: string;
};

export function FormComponent({
  formId,
  elements,
  isPreview,
}: FormComponentProps) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: string }) =>
      await submitForm(id, values),
  });
  const formSchema = generateSchema(elements);

  const form = useForm<SubmitFormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: SubmitFormValues) => {
    if (!isPreview) {
      const valuesArr = Object.entries(values);

      const submissions = valuesArr.map(([key, value]) => {
        const element = elements.find(
          (ele) => ele.extraAttributes.label === key
        );

        return {
          type: element ? element.type : undefined,
          question: key,
          answer: value ?? "No Answer Given",
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
      console.log({ values });
      console.log({ message: "Form submitted successfully!" });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {elements.map(
          ({
            id,
            type,
            extraAttributes: { description, label, placeholder, required },
          }) => (
            <FormField
              key={id}
              name={label}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {label} {required && "*"}
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type={type == "NumberField" ? "number" : "text"}
                      placeholder={placeholder}
                    />
                  </FormControl>
                  <FormMessage />

                  {description && (
                    <FormDescription className="">
                      {description}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
          )
        )}

        <Button disabled={isPending} className="w-full">
          {isPreview && isPending ? (
            <Loader className="" size={10} />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
