import { FormElements } from "@/builder/FormElements";
import { ControlItem } from "./controlItem";

export const Controlsbar = () => {
  return (
    <div className="h-screen bg-black flex flex-col">
      <div className="flex flex-col gap-2 px-4 py-2">
        <h3 className="text-xs  text-muted-foreground">Form Elements</h3>
        <div className="flex flex-col items-start gap-2">
          <ControlItem formElement={FormElements.NumberField} />
          <ControlItem formElement={FormElements.TextField} />
        </div>
      </div>
    </div>
  );
};
