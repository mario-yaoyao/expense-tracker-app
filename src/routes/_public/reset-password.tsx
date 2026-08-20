import { createFileRoute } from "@tanstack/react-router";

import AuthPage from "../../pages/AuthPage";

export const Route = createFileRoute("/_public/reset-password")({
  validateSearch: (search) => ({
    token: search.token as string,
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <AuthPage authForm="resetPassword" />;
}
