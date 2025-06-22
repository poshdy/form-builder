import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Form } from "@/types/forms";
import dayjs from "dayjs";
import { MoreVerticalIcon } from "lucide-react";
import RelativeTime from "dayjs/plugin/relativeTime";

import { Badge } from "@/components/ui/badge";

dayjs.extend(RelativeTime);
type FormCardProps = {
  form: Form;
};

export const FormCard = ({ form }: FormCardProps) => {
  return (
    <Card>
      <CardHeader className="flex items-start justify-between">
        <div className="flex flex-col items-start gap-1">
          <CardTitle>{form.title}</CardTitle>
          <CardDescription>{form.description}</CardDescription>
        </div>
        <MoreVerticalIcon className="text-secondary" size={18} />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Created At {dayjs(form.createdAt).fromNow()}</span>
            <span>•</span>
            <span>{form.submissions} submissions</span>
          </div>
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
        </div>
      </CardContent>
    </Card>
  );
};
