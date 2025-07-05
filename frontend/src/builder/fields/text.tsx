import { Label } from "@/components/ui/label";
import type {
  FormElement,
  FormElementInstance,
  FormElementType,
} from "../FormElements";

import { MdOutlineTextFields } from "react-icons/md";
import { Input } from "@/components/ui/input";

const type: FormElementType = "TextField";

const extraAttributes = {
  label: "Text Field",
  placeHolder: "Joe Doe",
  required: true,
  extraText: "this is a description for text input",
};

export const TextElementField: FormElement = {
  constructor: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  type,
  //  will be displayed in droppable container
  designerComponent: DesignerComponent,

  // will be displayed in side bar
  properties: () => <div>Properties component</div>,
  // will be displayed in form submission page
  formComponent: () => <div>Form component</div>,
  controlBtn: {
    icon: MdOutlineTextFields,
    label: "Text Field",
  },
};

type CustomElementInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomElementInstance;

  const { extraText, label, placeHolder, required } = element.extraAttributes;

  return (
    <div className="w-full flex flex-col gap-2 px-4 py-6 items-start">
      <Label className=" text-xs">
        {label} {required && "*"}
      </Label>
      <Input
        readOnly
        disabled
        className="placeholder:text-xs"
        placeholder={placeHolder}
      />

      <span className="text-xs ">{extraText}</span>
    </div>
  );
}
