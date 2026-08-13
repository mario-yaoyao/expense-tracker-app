import { createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import "../styles/layout/appLayout.scss";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontSize: "14px",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}
