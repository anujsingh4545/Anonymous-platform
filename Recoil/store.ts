import { configureStore } from "@reduxjs/toolkit";
import SavedPostSlice from "./slices/SavedPostSlice";

import NotificationSlice from "./slices/NotificationSlice";

export const store = configureStore({
  reducer: {
    SavedPostSlice,
    NotificationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
