import { createFileRoute } from "@tanstack/react-router";

import ExpensePage from "../pages/ExpensePage";

export const Route = createFileRoute("/expense")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ExpensePage />;
}
