import { RiDashboardLine } from "react-icons/ri";
import { PiMoneyWavy } from "react-icons/pi";
import { MdOutlineCategory } from "react-icons/md";
import { TbMoneybagPlus } from "react-icons/tb";

import type { TNavLink } from "../types/navLink";

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
  {
    id: 3,
    to: "/categories",
    label: "Categories",
    icon: MdOutlineCategory,
  },
  {
    id: 4,
    to: "/income",
    label: "Income",
    icon: TbMoneybagPlus,
  },
];
