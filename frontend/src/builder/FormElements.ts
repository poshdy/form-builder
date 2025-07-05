import { NumberElementField } from "./fields/number";
import { TextElementField } from "./fields/text";

export type FormElementType = "TextField" | "NumberField";

export type FormElementInstance = {
  id: string;
  type: FormElementType;
  extraAttributes?: Record<string, any>;
};

export type FormElement = {
  type: FormElementType;
  formComponent: React.FC;
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
  properties: React.FC;

  constructor: (id: string) => FormElementInstance;
  controlBtn: {
    icon: React.ElementType;
    label: string;
  };
};

type FormElements = {
  [key in FormElementType]: FormElement;
};

export const FormElements: FormElements = {
  TextField: TextElementField,
  NumberField: NumberElementField,
};
