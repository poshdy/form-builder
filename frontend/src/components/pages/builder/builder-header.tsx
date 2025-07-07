import { saveForm } from "@/api/actions/form";
import { useBuilderContext } from "@/builder/context/builder-context";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { saveSchema } from "@/schemas/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import PreviewModal from "./preview-modal";
import { useState } from "react";

export const BuilderHeader = ({
  formTitle,
  id,
}: {
  formTitle: string;
  id: string;
}) => {
  const { elements } = useBuilderContext();
  const [open, setOpen] = useState<boolean>(false);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () =>
      await saveForm(id, { fields: JSON.stringify(elements) }),
    onSuccess() {
      toast.success("Form Saved Successfully!");
    },
  });
  return (
    <header className="w-full flex justify-between items-center px-4 py-2 bg-secondary">
      <h3 className="font-bold text-xl">{formTitle}</h3>

      <div className="flex items-center gap-6">
        <PreviewModal open={open} setOpen={setOpen} />
        <div className="flex items-center gap-1">
          <Button
            onClick={async () => {
              const fields = JSON.stringify(elements);
              const parsed = saveSchema.safeParse({ fields });

              if (parsed.success) {
                await mutateAsync();
              } else {
                toast.error(`${parsed.error.message}`);
              }
            }}
            disabled={elements.length == 0 || isPending}
            size={"sm"}
            variant={"secondary"}
            className="cursor-pointer"
          >
            {isPending ? <Loader size={10} className="" /> : "Save"}
          </Button>
          <Button size={"sm"} variant={"default"}>
            Publish
          </Button>
        </div>
      </div>
    </header>
  );
};
