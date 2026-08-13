import { createFileRoute, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "../../utils/auth";
import AuthPage from "../../pages/AuthPage";

export const Route = createFileRoute("/_public/login")({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <AuthPage authForm="login" />;
}
