import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Form } from "@/types/forms";
import { Link } from "@tanstack/react-router";
import { Building, Edit2, Eye, Trash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ActionsMenu, type MenuItems } from "@/components/actions-menu";
import { timeDistance } from "@/lib/dayjs";
import { CreateUpdateFormModal } from "./create-update-modal";
import { useState } from "react";

type FormCardProps = {
  form: Form;
};

export const FormCard = ({ form }: FormCardProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const items: MenuItems[] = [
    {
      label: "Edit",
      icon: <Edit2 />,
      onClick: (e) => {
        e.stopPropagation();
        setOpen(true);
      },
    },
    {
      label: "Delete",
      icon: <Trash className="text-red-900" />,
    },
  ];
  return (
    <>
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div className="flex flex-col items-start gap-1">
            <CardTitle className="space-x-3">
              <span>{form.title}</span>

              <Badge
                variant={form.publishedAt ? "default" : "secondary"}
                className={
                  form.publishedAt
                    ? "bg-green-500/20 text-green-400 border-green-500/50"
                    : ""
                }
              >
                {form.publishedAt ? "Published" : "Draft"}
              </Badge>
            </CardTitle>
            <CardDescription>
              {form.description ? form.description : "No Description"}
            </CardDescription>
          </div>
          <ActionsMenu items={items} />
        </CardHeader>
        <CardContent className="pt-0   flex flex-col gap-5">
          <div className="flex items-center space-x-4 grow text-sm text-muted-foreground">
            <span>Created At {timeDistance(form.createdAt)}</span>
            <span>•</span>
            <span>{form.submissions} submissions</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              className="w-full rounded-md bg-secondary text-secondary-foreground text-center py-1 flex items-center gap-2 justify-center"
              to={`/forms/$formId`}
              params={{
                formId: form.id,
              }}
            >
              View Details <Eye />
            </Link>
            <Link
              className="w-full rounded-md bg-primary text-secondary-foreground text-center py-1 flex items-center gap-2 justify-center"
              to={`/builder/$formId`}
              params={{
                formId: form.id,
              }}
            >
              Build <Building />
            </Link>
          </div>
        </CardContent>
      </Card>
      {open && (
        <CreateUpdateFormModal
          onClose={() => setOpen(false)}
          formData={form}
          open={open}
        />
      )}
    </>
  );
};
