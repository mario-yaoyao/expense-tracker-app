import { createFileRoute, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "../../utils/auth";
import IncomeDetails from "../../components/Income/IncomeDetails";

export const Route = createFileRoute("/_private/income/$incomeId")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { incomeId } = Route.useParams();

  return <IncomeDetails incomeId={incomeId} />;
}
