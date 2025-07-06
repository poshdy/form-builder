import {
  defaultExtraAttributes,
  type FormElement,
  type FormElementType,
} from "@/builder/FormElements";
import { FormComponent } from "@/components/pages/builder/form-component";

import { MdOutlineTextFields } from "react-icons/md";

const type: FormElementType = "TextField";

export const TextElementField: FormElement = {
  constructor: (id) => ({
    id,
    type,
    extraAttributes: { ...defaultExtraAttributes, label: "Text Input" },
  }),
  type,
  formComponent: FormComponent,
  controlBtn: {
    icon: MdOutlineTextFields,
    label: "Text Field",
  },
};
