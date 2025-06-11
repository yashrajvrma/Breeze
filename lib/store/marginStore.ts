import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type MarginState = {
  leftMargin: number;
  rightMargin: number;
  setLeftMargin: (leftMargin: number) => void;
  setRightMargin: (rightMargin: number) => void;
};

export const useMargin = create<MarginState>()(
  persist(
    (set) => ({
      leftMargin: 56,
      setLeftMargin: (leftMargin: number) => set({ leftMargin }),
      rightMargin: 56,
      setRightMargin: (rightMargin: number) => set({ rightMargin }),
    }),
    {
      name: "margin-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
