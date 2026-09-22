import { RiDashboardLine } from "react-icons/ri";
import { PiMoneyWavy } from "react-icons/pi";
import { MdOutlineCategory } from "react-icons/md";
import { TbMoneybagPlus } from "react-icons/tb";
import { LuUsersRound } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";

import type { TNavLink } from "../types/navLink";

export const getNavLinks = (isSuperAdmin: boolean): TNavLink[] => [
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
    to: "/income",
    label: "Income",
    icon: TbMoneybagPlus,
  },
  {
    id: 4,
    to: "/categories",
    label: "Categories",
    icon: MdOutlineCategory,
  },
  ...(isSuperAdmin
    ? [
        {
          id: 5,
          to: "/users",
          label: "Users",
          icon: LuUsersRound,
        },
      ]
    : []),
  {
    id: 6,
    to: "/transactions",
    label: "Transactions",
    icon: GrTransaction,
  },
];
