import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/income")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_private/income"!</div>;
}
