import { DragOverlay, useDndMonitor, type Active } from "@dnd-kit/core";
import { ItemOverlay } from "./controlItem";
import { FormElements, type FormElementType } from "@/builder/FormElements";
import { useState } from "react";

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (e) => setDraggedItem(e.active),
    onDragCancel: () => setDraggedItem(null),
    onDragEnd: () => setDraggedItem(null),
  });

  if (!draggedItem) return null;

  const isDesignerBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;

  let node: React.ReactNode;

  if (isDesignerBtnElement) {
    const type = draggedItem.data?.current?.type as FormElementType;

    node = <ItemOverlay formElement={FormElements[type]} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
