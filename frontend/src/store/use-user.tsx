import { apiCall } from "@/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  accountId: string;
  email: string;
  accessToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface IUserState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  refreshToken: () => Promise<string>;
}

export const useUser = create<IUserState>()(
  persist(
    (set, get) => ({
      user: null,
      logout() {
        set({ user: null });
      },
      login(user) {
        set({ user });
      },

      refreshToken: async () => {
        const user = get().user as User;

        const response = await apiCall.get("/authentication/refresh-token");
        const newAccessToken = response.data.accessToken;

        set({ user: { ...user, accessToken: newAccessToken } });

        return newAccessToken;
      },
    }),
    { name: "user" }
  )
);
