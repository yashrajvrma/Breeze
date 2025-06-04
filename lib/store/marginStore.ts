import { create } from "zustand";

type MarginState = {
  leftMargin: number;
  rightMargin: number;
  setLeftMargin: (leftMargin: number) => void;
  setRightMargin: (rightMargin: number) => void;
};

export const useMargin = create<MarginState>((set) => ({
  leftMargin: 56,
  setLeftMargin: (leftMargin: number) => set({ leftMargin }),
  rightMargin: 56,
  setRightMargin: (rightMargin: number) => set({ rightMargin }),
}));
