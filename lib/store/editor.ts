import { create } from "zustand";
import { type Editor, JSONContent } from "@tiptap/react";

type EditorState = {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
};

type EditorContent = {
  id: string | null;
  content: JSONContent | null;
  setContentId: (id: string | null) => void;
  setEditorContent: (content: JSONContent | null) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));

export const useEditorContent = create<EditorContent>((set) => ({
  id: null,
  content: null,
  setContentId: (id) => set({ id }),
  setEditorContent: (content) => set({ content }),
}));
