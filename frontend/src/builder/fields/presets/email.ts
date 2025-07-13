import {
  defaultExtraAttributes,
  type FormElement,
  type FormElementType,
} from "@/builder/FormElements";

import { MdOutlineAlternateEmail } from "react-icons/md";

const type: FormElementType = "EmailField";

export const EmailElementField: FormElement = {
  constructor: (id) => ({
    id,
    type,
    extraAttributes: {
      ...defaultExtraAttributes,
      placeholder: "name@example.com",
      label: "Enter Your Email",
    },
  }),
  type,
  controlBtn: {
    icon: MdOutlineAlternateEmail,
    label: "Email Field",
  },
};
