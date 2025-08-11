import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  setToken: (newToken) => {
    localStorage.setItem("token", newToken);
    set({ token: newToken });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));

export default useAuthStore;
