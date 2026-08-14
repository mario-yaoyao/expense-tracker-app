import { create } from "zustand";

import type { TProfileState } from "../types/profile";

export const useProfile = create<TProfileState>((set) => ({
  profile: null,

  setProfile: (profile) => set({ profile }),

  clearProfile: () => set({ profile: null }),
}));
