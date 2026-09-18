import { createFileRoute } from "@tanstack/react-router";

import TransactionPage from "../../pages/TransactionPage";

export const Route = createFileRoute("/_private/transactions/")({
  component: TransactionPage,
});
