import { createFileRoute, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "../../utils/auth";
import CategoryDetails from "../../components/Category/CategoryDetails";

export const Route = createFileRoute("/_private/categories/$categoryId")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { categoryId } = Route.useParams();

  return <CategoryDetails categoryId={categoryId} />;
}
