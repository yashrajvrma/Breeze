import { create } from "zustand";

type Theme = "light" | "dark" | "system";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "system",
  setTheme: (theme: Theme) => set({ theme }),
}));
