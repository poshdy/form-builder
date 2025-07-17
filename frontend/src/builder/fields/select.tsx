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

import { IoIosArrowDropdown } from "react-icons/io";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useBuilderContext } from "../context/builder-context";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { ElementInstanceProps, SubmitValue } from "@/types/forms";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { FaTrash } from "react-icons/fa6";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const type: FormElementType = "SelectField";

export const SelectElementField: FormElement = {
  constructor: (id) => ({
    id,
    type,
    extraAttributes: {
      ...defaultExtraAttributes,
      label: "Select Input",
      options: [],
    },
  }),
  attributesComponent: ({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) => <SelectAttributesComponent elementInstance={elementInstance} />,

  builderComponent: ({
    elementInstance,
  }: {
    elementInstance: FormElementInstance;
  }) => <SelectBuilderComponent elementInstance={elementInstance} />,

  formComponent: ({
    elementInstance,
    submitValue,
  }: ElementInstanceProps & SubmitValue) => (
    <SelectFormComponent
      elementInstance={elementInstance}
      submitValue={submitValue}
    />
  ),
  type,
  controlBtn: {
    icon: IoIosArrowDropdown,
    label: "Select Field",
  },
};

const SelectBuilderComponent = ({
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
        className="placeholder:text-xs"
        placeholder={placeholder}
      />

      <span className="text-xs">{description}</span>
    </div>
  );
};
const SelectAttributesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const { updateElementProps } = useBuilderContext();
  const element = elementInstance as CustomElementInstance;

  const selectElementSchema = z.object({
    label: z.string(),
    description: z.string().max(100),
    required: z.boolean(),
    placeholder: z.string(),
    options: z.array(
      z.object({
        option: z.string(),
      })
    ),
  });

  type SelectElementFormValues = z.infer<typeof selectElementSchema>;
  const { extraAttributes } = element;

  const form = useForm<SelectElementFormValues>({
    resolver: zodResolver(selectElementSchema),
    defaultValues: {
      ...extraAttributes,
    },
  });

  const { append, fields, remove } = useFieldArray({
    name: "options",
    control: form.control,
  });

  const handleSubmit = (values: SelectElementFormValues) => {
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

        <div className="space-y-2">
          {fields.map((field, id) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`options.${id}.option`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Options</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        onKeyDown={(e) => {
                          if (e.key == "Enter") {
                            e.currentTarget.blur();
                          }
                        }}
                        type="text"
                        {...field}
                        placeholder="option"
                      />
                      <Button
                        onClick={() => remove(id)}
                        size={"icon"}
                        variant={"destructive"}
                      >
                        <FaTrash className="text-secondary-foreground" />
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          <Button
            className="w-full"
            type="button"
            onClick={() => append({ option: "" })}
            variant={"secondary"}
          >
            Add Options
          </Button>
        </div>
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

type SelectElementInstance = CustomElementInstance & {
  extraAttributes: {
    options: { option: string }[];
  };
};
const SelectFormComponent = ({
  elementInstance,
  submitValue,
}: ElementInstanceProps & SubmitValue) => {
  const {
    extraAttributes: { description, label, placeholder, required, options },
  } = elementInstance as SelectElementInstance;

  const textSchema = z.object({
    value: required ? z.string() : z.string().optional(),
  });

  type SelectInputValue = z.infer<typeof textSchema>;
  const form = useForm<SelectInputValue>({
    resolver: zodResolver(textSchema),
  });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const handleSubmit = (values: SelectInputValue) => {
    submitValue({ key: label, value: values.value ?? "", type });
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

              <Select {...field} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {options?.map((opt, idx) => (
                    <SelectItem
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          e.currentTarget.blur();
                        }
                      }}
                      value={opt.option}
                      key={idx}
                    >
                      {opt.option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
