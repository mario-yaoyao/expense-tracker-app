import { createFileRoute, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "../../utils/auth";
import TransactionDetails from "../../components/Transaction/TransactionDetails";

export const Route = createFileRoute("/_private/transactions/$transactionId")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { transactionId } = Route.useParams();

  return <TransactionDetails transactionId={transactionId} />;
}
