import { createFileRoute, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "../../utils/auth";

export const Route = createFileRoute("/_private/profile")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/authenticated/profile"!</div>;
}
