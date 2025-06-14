import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SidebarState = {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (isSidebarCollapsed: boolean) => void;
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isSidebarCollapsed: true,
      setIsSidebarCollapsed: (isSidebarCollapsed: boolean) =>
        set({ isSidebarCollapsed }),
    }),
    {
      name: "sidebar-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
