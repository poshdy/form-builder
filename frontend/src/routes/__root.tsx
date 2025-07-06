import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import TanstackQueryLayout from "../integrations/tanstack-query/layout";
import type { QueryClient } from "@tanstack/react-query";
import ToasterProvider from "@/components/providers/toast";
import type { IUserState } from "@/store/use-user";
import { ThemeProvider } from "@/components/providers/theme";
import { BuilderContextProvider } from "@/builder/context/builder-context";

interface MyRouterContext {
  queryClient: QueryClient;
  auth: IUserState;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BuilderContextProvider>
        <div className="bg-background   w-full min-h-screen h-screen">
          <ToasterProvider />

          <Outlet />
          <TanStackRouterDevtools />

          <TanstackQueryLayout />
        </div>
      </BuilderContextProvider>
    </ThemeProvider>
  ),
});
