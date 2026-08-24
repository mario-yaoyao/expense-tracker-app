import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "../../utils/auth";

export const Route = createFileRoute("/_private/categories")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <Outlet />,
});
