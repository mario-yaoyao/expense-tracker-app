export type TJwtPayload = {
  ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]: string;
  ["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]: string;
  ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]: string;
  exp: number;
};

export type TUser = {
  id?: string;
  username: string;
  role: string | number;
  fullName?: string;
  contactNumber?: string;
  isActive?: boolean;
};

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export interface IAuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  user: TUser | null;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isUser: boolean;
  setTokens: (tokens: TTokens) => void;
  clearTokens: () => void;
}

export type TLoginSchema = {
  Username: string;
  Password: string;
};

export type TRegisterSchema = {
  FullName: string;
  Username: string;
  ContactNumber: string;
  Password: string;
  ConfirmPassword: string;
};
