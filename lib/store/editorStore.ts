import { create } from "zustand";
import { type Editor, HTMLContent } from "@tiptap/react";

type EditorState = {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
};

type EditorContent = {
  id: string | null;
  title: string;
  content: HTMLContent | null;
  setContentId: (id: string | null) => void;
  setContentTitle: (title: string) => void;
  setEditorContent: (content: HTMLContent | null) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));

export const useEditorContent = create<EditorContent>((set) => ({
  id: null,
  title: "Untitled Doc",
  content: null,
  setContentId: (id) => set({ id }),
  setContentTitle: (title) => set({ title }),
  setEditorContent: (content) => set({ content }),
}));
