import { createFileRoute, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "../../utils/auth";
import UserPage from "../../pages/UserPage";

export const Route = createFileRoute("/_private/users")({
  beforeLoad: () => {
      if (!isAuthenticated()) {
        throw redirect({ to: "/login" });
      }
    },
  component: RouteComponent,
});

function RouteComponent() {
  return <UserPage />;
}
