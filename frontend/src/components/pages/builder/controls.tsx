import { FormElements, type FormElementInstance } from "@/builder/FormElements";
import { ControlItem } from "./controlItem";

import { useBuilderContext } from "@/builder/context/builder-context";
import { Separator } from "@/components/ui/separator";

export const Controlsbar = () => {
  const { activeElement } = useBuilderContext();

  return (
    <div className="h-screen bg-black flex flex-col">
      <div className="flex flex-col gap-2 px-4 py-2">
        {activeElement ? (
          <ElementAttributeWrapper elementInstance={activeElement} />
        ) : (
          <section className="space-y-2">
            <div className="flex flex-col gap-1">
              <h3>Presets</h3>
              <div className="flex flex-col items-start gap-2">
                <ControlItem formElement={FormElements.EmailField} />
                <ControlItem formElement={FormElements.NameField} />
              </div>
            </div>

            <Separator />
            <div className="flex flex-col gap-1">
              <h3 className="text-xs  text-muted-foreground">Form Elements</h3>
              <div className="flex flex-col items-start gap-2">
                <ControlItem formElement={FormElements.NumberField} />
                <ControlItem formElement={FormElements.TextField} />
                <ControlItem formElement={FormElements.DateField} />
                <ControlItem formElement={FormElements.SelectField} />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const ElementAttributeWrapper = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) => {
  const FormElementAttributes =
    FormElements[elementInstance.type].attributesComponent;
  return <FormElementAttributes elementInstance={elementInstance} />;
};
