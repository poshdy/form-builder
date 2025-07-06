import type {
  CustomElementInstance,
  FormElementInstance,
} from "@/builder/FormElements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
type DesignerComponentProps = {
  elementInstance: FormElementInstance;
};
export const DesignerComponent = ({
  elementInstance,
}: DesignerComponentProps) => {
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
