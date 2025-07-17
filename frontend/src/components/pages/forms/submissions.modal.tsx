import type { FormElementType } from "@/builder/FormElements";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FormSubmission, SubmissionValues } from "@/types/forms";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type SubmissionModalProps = {
  open: boolean;
  formTitle: string;
  onClose: () => void;
  responses: FormSubmission[];
  response: FormSubmission;
};
export const SubmissionModal = ({
  onClose,
  open,
  responses,
  response,
  formTitle,
}: SubmissionModalProps) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [activeResponse, setActiveResponse] = useState<FormSubmission | null>(
    null
  );

  useEffect(() => {
    const currentResponse = responses.findIndex(
      (res) => res.submittedAt == response.submittedAt
    );

    setCurrentIdx(currentResponse);
    setActiveResponse(responses[currentResponse]);
  }, [response]);

  const next = () => {
    const nextItem = responses[currentIdx + 1];
    if (nextItem) {
      setCurrentIdx(currentIdx + 1);
      setActiveResponse(responses[currentIdx + 1]);
    }
  };

  const prev = () => {
    const prevItem = responses[currentIdx - 1];

    if (prevItem) {
      setCurrentIdx(currentIdx - 1);
      setActiveResponse(responses[currentIdx - 1]);
    }
  };

  const { isThereNextItem, isTherePrevItem } = useMemo(() => {
    const nextItem = responses[currentIdx + 1];
    const prevItem = responses[currentIdx - 1];

    const isThereNextItem = nextItem ? false : true;
    const isTherePrevItem = prevItem ? false : true;

    return {
      isThereNextItem,
      isTherePrevItem,
    };
  }, [currentIdx]);
  return (
    <Dialog onOpenChange={onClose} open={open}>
      <DialogContent className="min-w-[600px] w-[800px] max-w-5xl h-[80vh] overflow-y-scroll">
        <DialogHeader>
          <div className="flex items-center mt-2 justify-between">
            <div>
              <DialogTitle>{formTitle}</DialogTitle>
              <DialogDescription>Navigate between responses</DialogDescription>
            </div>

            <div className="flex items-center gap-2">
              <Button
                disabled={isTherePrevItem}
                variant={"outline"}
                onClick={prev}
                size={"icon"}
                className="rounded-full"
              >
                <ArrowLeft size={15} />
              </Button>
              <span className="text-xs font-semibold text-muted-foreground">
                {currentIdx + 1} of {responses.length}
              </span>
              <Button
                disabled={isThereNextItem}
                size={"icon"}
                variant={"outline"}
                onClick={next}
                className="rounded-full"
              >
                <ArrowRight />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2">
          {activeResponse?.values.map((submission, idx) => (
            <Card key={idx}>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-primary w-5 h-5 text-xs shrink-0  flex items-center justify-center rounded-full">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-muted-foreground">
                    {submission.question}
                  </h3>
                </div>
                {renderValues(submission.type, submission)}
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const renderValues = (type: FormElementType, values: SubmissionValues) => {
  switch (type) {
    case "TextField":
    case "NumberField":
    case "EmailField":
    case "NameField":
    case "DateField":
    case "SelectField":
      return (
        <div className="ml-7">
          <h2 className="text-sm">{values.answer}</h2>
        </div>
      );
  }
};
