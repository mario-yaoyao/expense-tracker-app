import { createFileRoute, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "../../utils/auth";
import DashboardPage from "../../pages/DashboardPage";

export const Route = createFileRoute("/_private/")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <DashboardPage />;
}
