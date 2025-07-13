import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/submission/already-submitted")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <Card className="">
        <CardHeader>
          <CardTitle>Thank you for your intrest!</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex items-center flex-col">
            <h3>Sorry you already filled this form before.</h3>
            <span>You can't do this action again</span>
          </div>

          <Link
            className="bg-primary block text-center w-full px-4 py-2 rounded-xl"
            to="/auth/login"
          >
            Start Creating Your Forms!
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
