import type { TUser } from "./auth";

export type TProfileState = {
  profile: TUser | null;
  setProfile: (profile: TUser | null) => void;
  clearProfile: () => void;
};

export type TChangePasswordSchema = {
  CurrentPassword: string;
  NewPassword: string;
  ConfirmNewPassword: string;
};
