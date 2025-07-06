import { GoNumber } from "react-icons/go";
import {
  defaultExtraAttributes,
  type FormElement,
  type FormElementType,
} from "@/builder/FormElements";
import { FormComponent } from "@/components/pages/builder/form-component";

const type: FormElementType = "NumberField";

export const NumberElementField: FormElement = {
  constructor: (id) => ({
    id,
    type,
    extraAttributes: { ...defaultExtraAttributes, label: "Number Input" },
  }),
  type,
  formComponent: FormComponent,
  controlBtn: {
    icon: GoNumber,
    label: "Number Field",
  },
};
