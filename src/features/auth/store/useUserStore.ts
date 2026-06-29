import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/entities/user/model/User";
import { clearAuthStorage } from "@/shared/lib/auth";

interface UserState {
  uuid: string | null;
  userId: string | null;
  userName: string | null;
  _hasHydrated: boolean;
  setUser: (data: User) => void;
  clearUser: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      uuid: null,
      userId: null,
      userName: null,
      _hasHydrated: false,
      setUser: (data) => set(data),
      clearUser: () => {
        clearAuthStorage();
        set({ uuid: null, userId: null, userName: null });
      },
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: "user",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
