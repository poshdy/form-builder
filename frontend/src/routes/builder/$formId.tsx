import { getForm } from "@/api/data-access/form";

import { Controlsbar } from "@/components/pages/builder/controls";
import { createFileRoute } from "@tanstack/react-router";
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { BuilderHeader } from "@/components/pages/builder/builder-header";
import { Separator } from "@/components/ui/separator";
import DragOverlayWrapper from "@/components/pages/builder/DragOverlay-wrapper";
import Designer from "@/components/pages/builder/designer-canvas";

export const Route = createFileRoute("/builder/$formId")({
  component: RouteComponent,
  loader: async ({ params }) => await getForm(params.formId),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  if (!data) return;
  return (
    <div className="min-h-screen bg-black flex-col">
      <BuilderHeader id={data?.id} formTitle={data?.title} />
      <Separator />
      <DndContext sensors={sensors}>
        <div className="flex">
          <div className="w-[70%] p-4">
            <Designer fields={data?.fields} />
          </div>

          <div className="w-[30%] border-l border-gray-700">
            <Controlsbar />
          </div>
        </div>

        <DragOverlayWrapper />
      </DndContext>
    </div>
  );
}
