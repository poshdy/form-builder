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

import { CSS } from "@dnd-kit/utilities";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

const Designer = () => {
  const { elements, handleAdd, setActiveElement, activeElement, setElements } =
    useBuilderContext();
  const { setNodeRef, isOver } = useDroppable({
    id: "designer",

    data: {
      isDesignerContainer: true,
    },
  });

  useDndMonitor({
    onDragEnd(event) {
      const data = event.active.data.current;
      const over = event.over?.data.current;
      const type = data?.type as FormElementType;
      const newElement = FormElements[type].constructor(cuid());

      const isDesignerElement = data?.isDesignerBtnElement;

      if (isDesignerElement && over?.isDesignerContainer && !data?.sortable) {
        handleAdd(elements.length, newElement);
      }
      if (data?.sortable) {
        const oldId = event.active?.id as string;
        const overId = over?.id as string;

        setElements((prev) => {
          const oldIndex = elements.findIndex((element) => element.id == oldId);
          const overIndex = elements.findIndex(
            (element) => element.id == overId
          );

          return arrayMove(prev, oldIndex, overIndex);
        });
      }

      const isDroppingBetweenElements =
        over?.isTopElement || over?.isBottomElement;

      if (!data?.sortable && isDroppingBetweenElements) {
        const itemId = over?.id;
        const itemPosition = elements.findIndex(
          (element) => element.id === itemId
        );
        handleAdd(
          over?.isTopElement ? itemPosition + 1 : itemPosition,
          newElement
        );
      }
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

      {elements.length && (
        <SortableContext
          items={elements}
          strategy={verticalListSortingStrategy}
        >
          <div ref={elementCardRef} className="flex flex-col w-full gap-2">
            {elements.map((element) => (
              <DesignerComponentWrapper element={element} key={element.id} />
            ))}
          </div>
        </SortableContext>
      )}

      {isOver && <div className="w-full rounded-2xl bg-accent mt-3 h-16" />}
    </div>
  );
};

export default Designer;

function DesignerComponentWrapper({
  element,
}: {
  element: FormElementInstance;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: element.id,
    data: {
      type: element.type,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
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
    <div
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "group relative flex overflow-clip flex-col items-center justify-center rounded-md bg-secondary/70 text-muted-foreground h-[120px]"
      )}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActiveElement(element);
        }}
        className="hidden  group-hover:flex absolute w-full h-full inset-0 z-40 bg-background/60"
      >
        <span className="text-xs cursor-pointer absolute w-[calc(100% - w-1/5)] top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%]">
          Click to edit element Attributes
        </span>

        <div
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(element.id);
          }}
          className="w-[8%] absolute right-0 top-0 flex cursor-pointer z-20 items-center justify-center bg-red-500/70 h-full "
        >
          <FaRegTrashAlt className="text-secondary-foreground" />
        </div>
      </div>

      <div
        ref={topElement.setNodeRef}
        className={cn(
          "absolute inset-0 w-full h-[8%] rounded-t-md",
          topElement.isOver && "bg-secondary-foreground"
        )}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-full h-full flex items-center",
          isDragging && "border rounded-md border-primary"
        )}
      >
        <DesignerComponent elementInstance={element} />
      </div>
      <div
        ref={bottomElement.setNodeRef}
        className={cn(
          "absolute bottom-0 w-full h-[8%] rounded-b-md",
          bottomElement.isOver && "bg-secondary-foreground"
        )}
      />
    </div>
  );
}
