import { getForm } from "@/api/data-access/form";

import { Controlsbar } from "@/components/pages/builder/controls";
import { createFileRoute } from "@tanstack/react-router";
import { DndContext } from "@dnd-kit/core";
import { BuilderHeader } from "@/components/pages/builder/builder-header";
import { Separator } from "@/components/ui/separator";
import DragOverlayWrapper from "@/components/pages/builder/DragOverlay-wrapper";
import Designer from "@/components/pages/builder/designer-canvas";
import { BuilderContextProvider } from "@/builder/context/builder-context";

export const Route = createFileRoute("/builder/$formId")({
  component: RouteComponent,
  loader: async ({ params }) => await getForm(params.formId),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-black flex-col">
      <BuilderContextProvider>
        <BuilderHeader formTitle={data?.title} />
        <Separator />
        <DndContext>
          <div className="flex">
            <div className="w-[70%] p-4">
              <Designer />
            </div>

            <div className="w-[30%] border-l border-gray-700">
              <Controlsbar />
            </div>
          </div>

          <DragOverlayWrapper />
        </DndContext>
      </BuilderContextProvider>
    </div>
  );
}
