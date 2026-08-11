import { createFileRoute } from "@tanstack/react-router";

import AuthPage from "../../pages/AuthPage";

export const Route = createFileRoute("/_public/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AuthPage authForm="register" />;
}
