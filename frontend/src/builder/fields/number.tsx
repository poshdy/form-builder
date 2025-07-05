import { GoNumber } from "react-icons/go";
import type {
  FormElement,
  FormElementInstance,
  FormElementType,
} from "../FormElements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const type: FormElementType = "NumberField";

const extraAttributes = {
  label: "Number Field",
  placeHolder: "Joe Doe",
  required: false,
};

export const NumberElementField: FormElement = {
  constructor: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  type,
  designerComponent: DesignerComponent,
  properties: () => <div>Properties component</div>,
  formComponent: () => <div>Form component</div>,
  controlBtn: {
    icon: GoNumber,
    label: "Number Field",
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
