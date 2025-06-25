import { getForm } from "@/api/data-access/form";
import Canvas from "@/components/pages/builder/canvas";
import { Controlsbar } from "@/components/pages/builder/controls";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/builder/$formId")({
  component: RouteComponent,
  loader: async ({ params }) => await getForm(params.formId),
});

function RouteComponent() {
  const { formId } = Route.useParams();
  const data = Route.useLoaderData();
  console.log({ data });
  return (
    <div className="min-h-screen bg-black flex">
      <div className="w-[70%] p-4">
        <Canvas />
      </div>

      <div className="w-[30%] border-l border-gray-700">
        <Controlsbar />
      </div>
    </div>
  );
}
