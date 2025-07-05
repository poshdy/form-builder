import type { FormElement } from "@/builder/FormElements";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";

type ControlItemProps = {
  formElement: FormElement;
};

export const ControlItem = ({ formElement }: ControlItemProps) => {
  const { icon: Icon, label } = formElement.controlBtn;

  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"secondary"}
      className={cn(
        "w-full aspect-video flex items-center justify-start rounded-md  text-muted-foreground cursor-grab  ",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.attributes}
      {...draggable.listeners}
    >
      <Icon className="text-xl" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};
export const ItemOverlay = ({ formElement }: ControlItemProps) => {
  const { icon: Icon, label } = formElement.controlBtn;
  return (
    <Button
      variant={"secondary"}
      className={cn(
        "w-full aspect-video flex items-center justify-start rounded-md  text-muted-foreground cursor-grab  "
      )}
    >
      <Icon className="text-xl" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};
