import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

type FormStatsCardProps = {
  title: string;
  value: (string | number) | undefined;
  Icon: LucideIcon;
};

export const FormStatsCard = ({ title, value, Icon }: FormStatsCardProps) => {
  return (
    <Card className="bg-card/50 backdrop-blur border-border hover:bg-card/70 transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
      </CardContent>
    </Card>
  );
};
