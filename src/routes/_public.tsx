import { createFileRoute, Outlet } from "@tanstack/react-router";

import "../styles/layout/authLayout.scss";

export const Route = createFileRoute("/_public")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
}
