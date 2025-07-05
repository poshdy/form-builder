import { Button } from "@/components/ui/button";

export const BuilderHeader = ({ formTitle }: { formTitle: string }) => {
  return (
    <header className="w-full flex justify-between items-center px-4 py-2 bg-secondary">
      <h3 className="font-bold text-xl">{formTitle}</h3>

      <div className="flex items-center gap-1">
        <Button variant={"outline"}>Preview</Button>
        <div className="flex items-center gap-1">
          <Button>Publish</Button>
        </div>
      </div>
    </header>
  );
};
