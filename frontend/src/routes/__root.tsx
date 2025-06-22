import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import TanstackQueryLayout from "../integrations/tanstack-query/layout";
import type { QueryClient } from "@tanstack/react-query";
import ToasterProvider from "@/components/providers/toast";
import type { IUserState } from "@/store/use-user";
import NavigationBar from "../components/Header";
import { ThemeProvider } from "@/components/providers/theme";

interface MyRouterContext {
  queryClient: QueryClient;
  auth: IUserState;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="bg-background   w-full min-h-screen h-screen">
        <ToasterProvider />
        <NavigationBar />
        <Outlet />
        <TanStackRouterDevtools />

        <TanstackQueryLayout />
      </div>
    </ThemeProvider>
  ),
});
