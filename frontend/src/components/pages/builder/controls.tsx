import { FormElements, type FormElementInstance } from "@/builder/FormElements";
import { ControlItem } from "./controlItem";

import { AttributesComponent } from "./attributes-component";
import { useBuilderContext } from "@/builder/context/builder-context";

export const Controlsbar = () => {
  const { activeElement } = useBuilderContext();

  return (
    <div className="h-screen bg-black flex flex-col">
      <div className="flex flex-col gap-2 px-4 py-2">
        {activeElement ? (
          <ElementAttributeWrapper elementInstance={activeElement} />
        ) : (
          <>
            <h3 className="text-xs  text-muted-foreground">Form Elements</h3>
            <div className="flex flex-col items-start gap-2">
              <ControlItem formElement={FormElements.NumberField} />
              <ControlItem formElement={FormElements.TextField} />
            </div>
          </>
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
  return <AttributesComponent elementInstance={elementInstance} />;
};
