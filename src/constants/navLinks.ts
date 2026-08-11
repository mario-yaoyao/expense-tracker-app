import { RiDashboardLine } from "react-icons/ri";
import type { TNavLink } from "../types/navLink";
import { PiMoneyWavy } from "react-icons/pi";

export const navLinks: TNavLink[] = [
  {
    id: 1,
    to: "/",
    label: "Dashboard",
    icon: RiDashboardLine,
  },
  {
    id: 2,
    to: "/expense",
    label: "Expenses",
    icon: PiMoneyWavy,
  },
];
