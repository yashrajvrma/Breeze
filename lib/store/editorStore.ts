import { create } from "zustand";
import { type Editor, HTMLContent } from "@tiptap/react";
import { persist, createJSONStorage } from "zustand/middleware";

type EditorState = {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

type EditorContent = {
  id: string | null;
  title: string;
  content: HTMLContent | null;
  setContentId: (id: string | null) => void;
  setContentTitle: (title: string) => void;
  setEditorContent: (content: HTMLContent | null) => void;
};

export const useEditorStore = create<EditorState>()((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
  isDrawerOpen: false,
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
}));

export const useEditorContent = create<EditorContent>()(
  persist(
    (set) => ({
      id: null,
      title: "Untitled Doc",
      content: null,
      setContentId: (id) => set({ id }),
      setContentTitle: (title) => set({ title }),
      setEditorContent: (content) => set({ content }),
    }),
    {
      name: "editor-Content",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
