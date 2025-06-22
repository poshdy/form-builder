import { Plus } from "lucide-react";
import React, { useState } from "react";

type ModalTriggerProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ModalTrigger = ({ setOpen }: ModalTriggerProps) => {
  return (
    <div
      onClick={() => setOpen(true)}
      className="min-h-[200px] border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-card/20 hover:bg-card/40 transition-all duration-200 cursor-pointer group"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
          <Plus className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Create New Form
          </h3>
          <p className="text-muted-foreground">Start building your form</p>
        </div>
      </div>
    </div>
  );
};
