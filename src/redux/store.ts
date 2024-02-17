import userSlice from "./slices/userSlice";
import feedSlice from "./slices/feedSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
  },
});
