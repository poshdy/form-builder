import type {
  CustomElementInstance,
  FormElementInstance,
} from "@/builder/FormElements";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

type FormComponentProps = {
  elements: CustomElementInstance[];
  isPreview: boolean;
};

export function FormComponent({ elements, isPreview }: FormComponentProps) {
  let schema = {} as Record<string, any>;

  elements.forEach((element) => {
    const validation =
      element.type == "NumberField" ? z.coerce.number() : z.string();
    const label = element.extraAttributes.label;

    const field = {
      [label]: element.extraAttributes.required
        ? validation
        : validation.optional(),
    };

    schema = { ...schema, ...field };
  });

  const formSchema = z.object(schema);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isPreview) {
      console.log({ values });
      console.log({ message: "Form submitted successfully!" });
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
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

        <Button className="w-full">Submit</Button>
      </form>
    </Form>
  );
}
