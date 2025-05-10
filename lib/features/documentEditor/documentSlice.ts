// lib/features/documentEditor/documentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JSONContent } from "@tiptap/core";

interface DocumentState {
  isVisible: boolean;
  content: JSONContent | string;
  title: string;
}

const initialState: DocumentState = {
  isVisible: false,
  content: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: "Start typing here..." }],
      },
    ],
  },
  title: "",
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    showDocument: (
      state,
      action: PayloadAction<{ content: JSONContent | string; title: string }>
    ) => {
      state.isVisible = true;
      state.content = action.payload.content;
      state.title = action.payload.title;
    },
    hideDocument: (state) => {
      state.isVisible = false;
    },
    updateDocumentContent: (
      state,
      action: PayloadAction<JSONContent | string>
    ) => {
      state.content = action.payload;
    },
    updateDocumentTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const {
  showDocument,
  hideDocument,
  updateDocumentContent,
  updateDocumentTitle,
} = documentSlice.actions;

export default documentSlice.reducer;
