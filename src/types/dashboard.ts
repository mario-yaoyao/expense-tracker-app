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