import {
  FormElements,
  type FormElementInstance,
  type FormElementType,
} from "@/builder/FormElements";
import { cn } from "@/lib/utils";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import cuid from "cuid";
import { useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { DesignerComponent } from "./designer-component";
import { useBuilderContext } from "@/builder/context/builder-context";

const Designer = () => {
  const { elements, handleAdd, setActiveElement, activeElement } =
    useBuilderContext();
  const { setNodeRef, isOver } = useDroppable({
    id: "designer",
  });

  useDndMonitor({
    onDragEnd(event) {
      const data = event.active.data.current;
      const over = event.over?.data;

      const type = data?.type as FormElementType;

      const newElement = FormElements[type].constructor(cuid());

      const isTopElement = over?.current?.isTopElement;
      const isBottom = over?.current?.isBottomElement;

      let position = 0;

      if (isTopElement) {
        const itemId = over.current?.id;
        const itemPosition = elements.findIndex(
          (element) => element.id === itemId
        );
        position = itemPosition;
      } else if (isBottom) {
        const itemId = over.current?.id;
        const itemPosition = elements.findIndex(
          (element) => element.id === itemId
        );

        position = itemPosition + 1;
      }

      handleAdd(position, newElement);
    },
  });

  const elementCardRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!activeElement) return;
    const target = e.target as Node;
    const isOutsideWrapper = !elementCardRef.current?.contains(target);

    if (isOutsideWrapper && activeElement) {
      setActiveElement(null);
    }
  };

  return (
    <div
      className={cn(
        "p-2 flex flex-col border-2 border-dashed border-secondary  h-full rounded-xl ease-in-out",

        isOver && "border-primary"
      )}
      onClick={handleClick}
      ref={setNodeRef}
    >
      {elements.length == 0 && !isOver && (
        <div className="flex items-center h-full justify-center w-full text-muted-foreground">
          Drop Here
        </div>
      )}

      {isOver && <div className="w-full rounded-2xl bg-accent mb-3 h-20"></div>}

      {elements.length && (
        <div ref={elementCardRef} className="flex flex-col w-full gap-2">
          {elements.map((element) => (
            <DesignerComponentWrapper element={element} key={element.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Designer;

function DesignerComponentWrapper({
  element,
}: {
  element: FormElementInstance;
}) {
  const { handleRemove, setActiveElement } = useBuilderContext();
  const topElement = useDroppable({
    id: element.id + "-top",
    data: {
      id: element.id,
      type: element.type,
      extraAttributes: element.extraAttributes,
      isTopElement: true,
    },
  });
  const bottomElement = useDroppable({
    id: element.id + "-bottom",
    data: {
      id: element.id,
      type: element.type,
      extraAttributes: element.extraAttributes,
      isBottomElement: true,
    },
  });

  return (
    <div className="group relative flex overflow-clip flex-col items-center justify-center rounded-md bg-secondary/70 text-muted-foreground h-[120px] ">
      <div className="hidden  group-hover:flex absolute w-full h-full inset-0 z-40 bg-background/60">
        <span
          onClick={(e) => {
            e.stopPropagation();
            setActiveElement(element);
          }}
          className="text-xs cursor-pointer absolute w-[calc(100% - w-1/5)] top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%]"
        >
          Click to edit element Attributes
        </span>

        <div
          onClick={() => handleRemove(element.id)}
          className="w-1/5 absolute right-0 top-0 flex cursor-pointer z-20 items-center justify-center bg-red-500/70 h-full "
        >
          <FaRegTrashAlt className="text-secondary-foreground" />
        </div>
      </div>

      <div
        ref={topElement.setNodeRef}
        className={cn(
          "absolute inset-0 w-full h-[10%] rounded-t-md",
          topElement.isOver && "bg-secondary-foreground"
        )}
      />
      <div className="w-full h-full flex items-center">
        <DesignerComponent elementInstance={element} />
      </div>
      <div
        ref={bottomElement.setNodeRef}
        className={cn(
          "absolute bottom-0 w-full h-[10%] rounded-b-md",
          bottomElement.isOver && "bg-secondary-foreground"
        )}
      />
    </div>
  );
}
