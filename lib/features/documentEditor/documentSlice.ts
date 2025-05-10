import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DocumentState {
  isVisible: boolean;
  content: string | null;
  title: string;
}

const initialState: DocumentState = {
  isVisible: false,
  content: null,
  title: "Untitled Document",
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    showDocument: (
      state,
      action: PayloadAction<{ content: string; title?: string }>
    ) => {
      state.isVisible = true;
      state.content = action.payload.content;
      if (action.payload.title) {
        state.title = action.payload.title;
      }
    },
    hideDocument: (state) => {
      state.isVisible = false;
    },
    updateDocumentContent: (state, action: PayloadAction<string>) => {
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
