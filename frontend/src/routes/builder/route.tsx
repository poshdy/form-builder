import { Button } from "@/components/ui/button";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/builder")({
  beforeLoad(ctx) {
    if (!ctx.context.auth?.user) {
      console.log({ user: ctx.context.auth?.user });
      throw redirect({
        to: "/auth/login",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <header className="w-full flex items-center justify-between py-2 px-4">
        <h3>Builder</h3>

        <div className="flex items-center gap-1">
          <Button>Publish</Button>
          <Button variant={"destructive"}>Cancel</Button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
