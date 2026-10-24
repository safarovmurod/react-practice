import { create } from "zustand";
interface ThemeStore {
  theme: string;
  changeTheme: (theme: string) => void;
}
export function applyTheme(theme: string) {
  let isDark = theme === "dark";
  if (theme === "auto") {
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  document.documentElement.classList.toggle("dark", isDark);
}
export const useThemeStore = create<ThemeStore>((set) => ({
  theme: localStorage.getItem("theme") || "light",
  changeTheme: (theme) => {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
    set({ theme });
  },
}));
