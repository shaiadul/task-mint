// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loadingSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    // add other slices here
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
