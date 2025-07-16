import {
  defaultExtraAttributes,
  type CustomElementInstance,
  type FormElement,
  type FormElementInstance,
  type FormElementType,
} from "@/builder/FormElements";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { CiCalendarDate } from "react-icons/ci";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBuilderContext } from "../context/builder-context";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { ElementInstanceProps, SubmitValue } from "@/types/forms";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const type: FormElementType = "DateField";

export const DateElementField: FormElement = {
  constructor: (id) => ({
    id,
    type,
    extraAttributes: { ...defaultExtraAttributes, label: "Date" },
  }),
  attributesComponent: ({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) => <DateAttributesComponent elementInstance={elementInstance} />,

  builderComponent: ({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) => <DateBuilderComponent elementInstance={elementInstance} />,

  formComponent: ({
    elementInstance,
    submitValue,
  }: ElementInstanceProps & SubmitValue) => (
    <DateFormComponent
      elementInstance={elementInstance}
      submitValue={submitValue}
    />
  ),
  type,
  controlBtn: {
    icon: CiCalendarDate,
    label: "Date Field",
  },
};

const DateBuilderComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const element = elementInstance as CustomElementInstance;
  const {
    extraAttributes: { description, label, placeholder, required },
  } = element;
  return (
    <div className="w-full flex flex-col gap-2 px-4 py-6 items-start">
      <Label className="text-white text-xs">
        {label} {required && "*"}
      </Label>
      <Input
        readOnly
        disabled
        type="date"
        className="placeholder:text-xs"
        placeholder={placeholder}
      />

      <span className="text-xs">{description}</span>
    </div>
  );
};
const DateAttributesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const { updateElementProps } = useBuilderContext();
  const element = elementInstance as CustomElementInstance;

  const dateElementSchema = z.object({
    label: z.string(),
    description: z.string().max(100),
    required: z.boolean(),
    placeholder: z.string(),
  });

  type DateElementFormValues = z.infer<typeof dateElementSchema>;
  const { extraAttributes } = element;

  const form = useForm<DateElementFormValues>({
    resolver: zodResolver(dateElementSchema),
    defaultValues: {
      ...extraAttributes,
    },
  });

  const handleSubmit = (values: DateElementFormValues) => {
    try {
      const { extraAttributes, ...rest } = elementInstance;
      const element = {
        ...rest,
        extraAttributes: {
          ...values,
        },
      };

      updateElementProps(element.id, element);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
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
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const DateFormComponent = ({
  elementInstance,
  submitValue,
}: ElementInstanceProps & SubmitValue) => {
  const {
    extraAttributes: { description, label, placeholder, required },
  } = elementInstance as CustomElementInstance;

  const DateSchema = z.object({
    value: required ? z.coerce.date() : z.coerce.date().optional(),
  });

  type DateInputValue = z.infer<typeof DateSchema>;
  const form = useForm<DateInputValue>({
    resolver: zodResolver(DateSchema),
  });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const handleSubmit = (values: DateInputValue) => {
    submitValue({
      key: label,
      value: values?.value?.toDateString() ?? "",
      type,
    });
  };
  return (
    <Form {...form}>
      <form
        onBlur={(e) => {
          e.stopPropagation();
          buttonRef.current?.click();
        }}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="value"
          control={form.control}
          render={({ field: { value, ...rest } }) => (
            <FormItem>
              <FormLabel>
                {label} {required && "*"}
              </FormLabel>

              <FormControl>
                <Input
                  onKeyUp={(e) => {
                    const keyPressed = e.key;

                    if (keyPressed == "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                  type="date"
                  placeholder={placeholder}
                  value={value?.toDateString()}
                  {...rest}
                />
              </FormControl>

              <FormMessage />
              {description && <FormDescription>{description}</FormDescription>}
            </FormItem>
          )}
        />
        <Button ref={buttonRef} className="hidden" />
      </form>
    </Form>
  );
};
