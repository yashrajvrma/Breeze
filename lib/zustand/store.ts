import { create } from "zustand";
import { type Editor } from "@tiptap/react";

type EditorState = {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
};

type MarginState = {
  leftMargin: number;
  rightMargin: number;
  setLeftMargin: (leftMargin: number) => void;
  setRightMargin: (rightMargin: number) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));

export const useMargin = create<MarginState>((set) => ({
  leftMargin: 56,
  setLeftMargin: (leftMargin: number) => set({ leftMargin }),
  rightMargin: 56,
  setRightMargin: (rightMargin: number) => set({ rightMargin }),
}));
