import { useBuilderContext } from "@/builder/context/builder-context";
import {
  defaultExtraAttributes,
  type BaseAttributes,
  type CustomElementInstance,
  type FormElement,
  type FormElementInstance,
  type FormElementType,
} from "@/builder/FormElements";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdOutlineAlternateEmail } from "react-icons/md";
import * as z from "zod";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import type { ElementInstanceProps, SubmitValue } from "@/types/forms";

import { FaUser } from "react-icons/fa6";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const type: FormElementType = "NameField";

export const NameElementField: FormElement = {
  constructor: (id) => ({
    id,
    type,
    extraAttributes: {
      ...defaultExtraAttributes,
      placeholder: "Joe doe",
      label: "Enter Your Name",
    },
  }),
  attributesComponent: ({ elementInstance }: ElementInstanceProps) => (
    <NameAttributesComponent elementInstance={elementInstance} />
  ),
  builderComponent: ({ elementInstance }: ElementInstanceProps) => (
    <NameBuilderComponent elementInstance={elementInstance} />
  ),
  formComponent: ({
    elementInstance,
    submitValue,
  }: ElementInstanceProps & SubmitValue) => (
    <NameFormComponent
      submitValue={submitValue}
      elementInstance={elementInstance}
    />
  ),
  type,
  controlBtn: {
    icon: FaUser,
    label: "Name Field",
  },
};

type NameInstance = FormElementInstance & {
  extraAttributes: Pick<BaseAttributes, "label" | "required"> & {
    firstNameLabel: string;
    lastNameLabel: string;
  };
};

function NameBuilderComponent({ elementInstance }: ElementInstanceProps) {
  const element = elementInstance as NameInstance;
  const {
    extraAttributes: { firstNameLabel, label, lastNameLabel, required },
  } = element;
  return (
    <div className="w-full flex flex-col gap-2 px-4 py-6 items-start">
      <Label className="text-white text-xs">
        {label} {required && "*"}
      </Label>
      <div className="flex items-center gap-2">
        <div className="flex items-start flex-col gap-1">
          <Input readOnly disabled className="placeholder:text-xs" />
          <Label className="text-xs text-muted-foreground">
            {firstNameLabel}
          </Label>
        </div>
        <div className="flex items-start flex-col gap-1">
          <Input readOnly disabled className="placeholder:text-xs" />
          <Label className="text-xs text-muted-foreground">
            {lastNameLabel}
          </Label>
        </div>
      </div>
    </div>
  );
}

function NameAttributesComponent({ elementInstance }: ElementInstanceProps) {
  const { updateElementProps } = useBuilderContext();

  const nameElementSchema = z.object({
    label: z.string(),
    firstNameLabel: z.string(),
    lastNameLabel: z.string(),
    required: z.boolean(),
  });

  type NameElementFormValues = z.infer<typeof nameElementSchema>;
  const { extraAttributes } = elementInstance;

  const form = useForm<NameElementFormValues>({
    resolver: zodResolver(nameElementSchema),
    defaultValues: {
      ...extraAttributes,
    },
  });

  const handleSubmit = (values: NameElementFormValues) => {
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
          name="firstNameLabel"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">First Name Label</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                  {...field}
                  placeholder="John"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="lastNameLabel"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Last Name Label</FormLabel>
              <FormControl>
                <Input
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                  placeholder="Doe"
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
}

const NameFormComponent = ({
  elementInstance,
  submitValue,
}: ElementInstanceProps & SubmitValue) => {
  const {
    extraAttributes: { firstNameLabel, lastNameLabel, label, required },
  } = elementInstance as NameInstance;

  const EmailSchema = z.object({
    firstName: required ? z.string() : z.string().optional(),
    lastName: required ? z.string() : z.string().optional(),
  });

  type NumberInputValue = z.infer<typeof EmailSchema>;
  const form = useForm<NumberInputValue>({
    resolver: zodResolver(EmailSchema),
  });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const handleSubmit = (values: NumberInputValue) => {
    submitValue({
      key: label,
      value: `${values?.firstName}  ${values?.lastName}`,
      type,
    });
  };
  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onBlur={(e) => {
          e.stopPropagation();
          buttonRef.current?.click();
        }}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Label>
          {label} {required && "*"}
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    onKeyUp={(e) => {
                      const keyPressed = e.key;

                      if (keyPressed == "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormLabel className="text-xs text-muted-foreground">
                  {firstNameLabel}
                </FormLabel>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    onKeyUp={(e) => {
                      const keyPressed = e.key;

                      if (keyPressed == "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormLabel className="text-xs text-muted-foreground">
                  {lastNameLabel}
                </FormLabel>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button ref={buttonRef} className="hidden" />
      </form>
    </Form>
  );
};
