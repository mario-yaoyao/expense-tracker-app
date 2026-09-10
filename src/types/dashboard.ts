type TRecentRegisteredUser = {
  id: number;
  username: string;
  role: number;
  createdAt: string;
};

export type TRecentRegisteredUsersProps = {
  data: TRecentRegisteredUser[];
  isLoading: boolean
  isError: boolean
};

export type TRecentTransactions = {
  data: {
    id: number;
    userId: number;
    username: string;
    action: string;
    activity: string;
    message: string;
    createdAt: string;
  }[]
  isLoading: boolean;
  isError: boolean;
};