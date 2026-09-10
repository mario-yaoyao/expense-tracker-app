import { createFileRoute, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "../../utils/auth";
import UserDetails from "../../components/User/UserDetails";

export const Route = createFileRoute("/_private/users/$userId")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();

  return <UserDetails userId={userId} />;
}
