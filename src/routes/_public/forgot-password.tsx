import { createFileRoute } from "@tanstack/react-router";

import AuthPage from "../../pages/AuthPage";

export const Route = createFileRoute("/_public/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AuthPage authForm="forgotPassword" />;
}
