type TRecentRegisteredUser = {
  id: number;
  username: string;
  role: number;
  createdAt: string;
};

export type TRecentRegisteredUsersProps = {
  data: TRecentRegisteredUser[];
  isLoading: boolean
};

export type TRecentTransactions = {
  isLoading: boolean;
  isError: boolean;
};