import {
  defaultExtraAttributes,
  type FormElement,
  type FormElementType,
} from "@/builder/FormElements";

import { FaUser } from "react-icons/fa6";

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
  type,
  controlBtn: {
    icon: FaUser,
    label: "Name Field",
  },
};
