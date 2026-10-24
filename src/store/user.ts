import { create } from "zustand";
import { axiosRequest, removeToken } from "../token/token";
import { useDebtStore } from "./debts";
interface User {
  id: string;
  name: string;
  email: string;
}
interface UserStore {
  user: User | null;
  getUser: () => Promise<void>;
  updateName: (name: string) => Promise<void>;
  logout: () => Promise<void>;
}
export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  getUser: async () => {
    const { data } = await axiosRequest.get("/api/users/me");
    set({ user: data });
  },
  updateName: async (name) => {
    await axiosRequest.patch("/api/users/me", { name: name.trim() });
    await get().getUser();
  },
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken)
        await axiosRequest.post("/api/auth/logout", { refreshToken });
    } finally {
      removeToken();
      set({ user: null });
      useDebtStore.setState({ debts: [], payments: [] });
      window.location.href = "/login";
    }
  },
}));
