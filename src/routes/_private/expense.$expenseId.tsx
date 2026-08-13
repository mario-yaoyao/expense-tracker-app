import { createFileRoute, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "../../utils/auth";
import ExpenseDetails from "../../components/Expense/ExpenseDetails";

export const Route = createFileRoute("/_private/expense/$expenseId")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { expenseId } = Route.useParams();

  return <ExpenseDetails expenseId={expenseId} />;
}
