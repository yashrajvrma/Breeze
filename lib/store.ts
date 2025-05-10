import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "@/lib/features/documentEditor/documentSlice";

export const store = configureStore({
  reducer: {
    document: documentReducer,
    // Add other reducers here as needed
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
