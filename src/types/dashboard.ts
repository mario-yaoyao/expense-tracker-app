import type { TChartData } from "./ui";

export type TSavingsBreakdown = {
  title: string;
  description: string;
  data: TChartData[];
  isLoading: boolean;
};

type TRecentRegisteredUser = {
  id: number;
  username: string;
  role: number;
  createdAt: string;
};

export type TRecentRegisteredUsersProps = {
  data: TRecentRegisteredUser[];
  isLoading: boolean;
  isError: boolean;
};

export type TRecentTransactions = {
  data: {
    id: number;
    userId: number;
    username: string;
    type: number;
    activity: string;
    message: string;
    createdAt: string;
  }[];
  isLoading: boolean;
  isError: boolean;
};
