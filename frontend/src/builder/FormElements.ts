import type React from "react";
import { NumberElementField } from "./fields/number";
import { EmailElementField } from "./fields/presets/email";
import { NameElementField } from "./fields/presets/name";
import { TextElementField } from "./fields/text";
import type { ZodObject } from "zod";

export type FormElementType =
  | "TextField"
  | "NumberField"
  | "EmailField"
  | "NameField";

export type FormElementInstance = {
  id: string;
  type: FormElementType;
  extraAttributes?: Record<string, any>;
};

export type FormElement = {
  type: FormElementType;
  constructor: (id: string) => FormElementInstance;
  attributesComponent: React.FC<{ elementInstance: FormElementInstance }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue: ({ key, value }: { key: string; value: string }) => void;
  }>;

  builderComponent: React.FC<{ elementInstance: FormElementInstance }>;
  controlBtn: {
    icon: React.ElementType;
    label: string;
  };

  // validate: (
  //   schema: ZodObject<any>,
  //   value: string
  // ) => { error: string | null; isValid: boolean };
};

type FormElements = {
  [key in FormElementType]: FormElement;
};

export const FormElements: FormElements = {
  TextField: TextElementField,
  NumberField: NumberElementField,
  EmailField: EmailElementField,
  NameField: NameElementField,
};

export const defaultExtraAttributes = {
  label: "field label",
  placeholder: "field placeholder",
  required: false,
  description: "field description",
};

export type BaseAttributes = typeof defaultExtraAttributes;

export type CustomElementInstance = FormElementInstance & {
  extraAttributes: BaseAttributes;
};

export type ChoiceElementInstance = FormElementInstance & {
  extraAttributes: BaseAttributes;
};
