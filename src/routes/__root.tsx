import { createRootRoute } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import AppLayout from "../layout/AppLayout";
import AuthLayout from "../layout/AuthLayout";

const RootLayout = () => {
  const isAuthenticated = true;

  return (
    <>
      {isAuthenticated ? <AppLayout /> : <AuthLayout />}
      {/* <TanStackRouterDevtools /> */}
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
