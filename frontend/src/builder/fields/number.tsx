import { GoNumber } from "react-icons/go";
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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBuilderContext } from "../context/builder-context";

import { Switch } from "@/components/ui/switch";
import type { ElementInstanceProps, SubmitValue } from "@/types/forms";
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const type: FormElementType = "NumberField";

export const NumberElementField: FormElement = {
  constructor: (id) => ({
    id,
    type,
    extraAttributes: { ...defaultExtraAttributes, label: "Number Input" },
  }),
  type,
  attributesComponent: ({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) => <NumberAttributesComponent elementInstance={elementInstance} />,
  builderComponent: ({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) => <NumberBuilderComponent elementInstance={elementInstance} />,
  formComponent: ({
    elementInstance,
    submitValue,
  }: ElementInstanceProps & SubmitValue) => (
    <NumberFormComponent
      elementInstance={elementInstance}
      submitValue={submitValue}
    />
  ),
  controlBtn: {
    icon: GoNumber,
    label: "Number Field",
  },
};

const NumberBuilderComponent = ({
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
      <Label className="Number-white Number-xs">
        {label} {required && "*"}
      </Label>
      <Input
        readOnly
        disabled
        className="placeholder:Number-xs"
        placeholder={placeholder}
      />

      <span className="Number-xs">{description}</span>
    </div>
  );
};
const NumberAttributesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const { updateElementProps } = useBuilderContext();
  const element = elementInstance as CustomElementInstance;

  const NumberElementSchema = z.object({
    label: z.string(),
    description: z.string().max(100),
    required: z.boolean(),
    placeholder: z.string(),
  });

  type NumberElementFormValues = z.infer<typeof NumberElementSchema>;
  const { extraAttributes } = element;

  const form = useForm<NumberElementFormValues>({
    resolver: zodResolver(NumberElementSchema),
    defaultValues: {
      ...extraAttributes,
    },
  });

  const handleSubmit = (values: NumberElementFormValues) => {
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
        className="flex flex-col gap-3 Number-muted-foreground w-full"
        onSubmit={(e) => e.preventDefault()}
        onBlur={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="label"
          control={form.control}
          render={({ field }) => (
            <FormItem className="Number-xs">
              <FormLabel className="Number-white">Label</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                  {...field}
                  className="Number-xs"
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
              <FormLabel className="Number-white">Placeholder</FormLabel>
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
              <FormLabel className="Number-white">Description</FormLabel>
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
                <FormLabel className="Number-white">Required</FormLabel>
                <p className="Number-xs ">
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

const NumberFormComponent = ({
  elementInstance,
  submitValue,
}: ElementInstanceProps & SubmitValue) => {
  const {
    extraAttributes: { description, label, placeholder, required },
  } = elementInstance as CustomElementInstance;

  const NumberSchema = z.object({
    value: required ? z.string() : z.string().optional(),
  });

  type NumberInputValue = z.infer<typeof NumberSchema>;
  const form = useForm<NumberInputValue>({
    resolver: zodResolver(NumberSchema),
  });

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const handleSubmit = (values: NumberInputValue) => {
    submitValue({ key: elementInstance.id, value: values.value ?? "" });
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
          render={({ field }) => (
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
                  type="number"
                  placeholder={placeholder}
                  {...field}
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
