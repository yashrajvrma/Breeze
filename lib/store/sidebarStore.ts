// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";

// type SidebarState = {
//   isSidebarCollapsed: boolean;
//   setIsSidebarCollapsed: (isSidebarCollapsed: boolean) => void;
// };

// export const useSidebarStore = create<SidebarState>()(
//   persist(
//     (set) => ({
//       isSidebarCollapsed: true,
//       setIsSidebarCollapsed: (isSidebarCollapsed: boolean) =>
//         set({ isSidebarCollapsed }),
//     }),
//     {
//       name: "sidebar-store",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SidebarState {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      open: true, // Default open state
      setOpen: (open) => set({ open }),
      toggle: () => set((state) => ({ open: !state.open })),
    }),
    {
      name: "sidebar-state", // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);
