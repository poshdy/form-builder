import { useBuilderContext } from "@/builder/context/builder-context";
import type {
  CustomElementInstance,
  FormElementInstance,
} from "@/builder/FormElements";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormComponent } from "./form-component";

type PreviewModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PreviewModal = ({ setOpen, open }: PreviewModalProps) => {
  const { elements } = useBuilderContext();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button onClick={() => setOpen(true)} className="" size={"sm"}>
          Preview
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preview Form</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <FormPreviewWrapper elements={elements} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;

const FormPreviewWrapper = ({
  elements,
}: {
  elements: FormElementInstance[];
}) => {
  return (
    <FormComponent
      elements={elements as CustomElementInstance[]}
      isPreview={true}
    />
  );
};
