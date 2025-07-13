import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import type {
  CustomElementInstance,
  FormElementInstance,
} from "@/builder/FormElements";
import { useBuilderContext } from "@/builder/context/builder-context";

export function AttributesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomElementInstance;

  const { updateElementProps } = useBuilderContext();
  const textPropsSchema = z.object({
    label: z.string(),
    placeholder: z.string(),
    required: z.boolean(),
    description: z.string().max(100),
  });

  const { extraAttributes } = element;
  type TextPropsFormValues = z.infer<typeof textPropsSchema>;
  const form = useForm<TextPropsFormValues>({
    resolver: zodResolver(textPropsSchema),
    defaultValues: {
      ...extraAttributes,
    },
  });

  const handleSubmit = (values: TextPropsFormValues) => {
    try {
      const { extraAttributes, ...rest } = elementInstance;
      const element = {
        ...rest,
        extraAttributes: {
          ...values,
        },
      };

      updateElementProps(element.id, element);
    } catch (error) {}
  };
  return (
    <div className="w-full flex flex-col gap-4 px-2 py-1 items-start">
      <Form {...form}>
        <form
          className="flex flex-col gap-3 text-muted-foreground w-full"
          onSubmit={(e) => e.preventDefault()}
          onBlur={form.handleSubmit(handleSubmit)}
        >
          <FormField
            name="label"
            control={form.control}
            render={({ field }) => (
              <FormItem className="text-xs">
                <FormLabel className="text-white">Label</FormLabel>
                <FormControl>
                  <Input
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                    {...field}
                    className="text-xs"
                    placeholder="field label"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="placeholder"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Placeholder</FormLabel>
                <FormControl>
                  <Input
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                    {...field}
                    placeholder="field placeholder"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Description</FormLabel>
                <FormControl>
                  <Textarea
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                    placeholder="field description"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="required"
            control={form.control}
            render={({ field }) => (
              <FormItem className="border border-accent rounded-md px-4 py-3 flex justify-between items-start">
                <div className="flex flex-col items-start gap-1">
                  <FormLabel className="text-white">Required</FormLabel>
                  <p className="text-xs ">
                    this field determines whether this field is optional or not
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
