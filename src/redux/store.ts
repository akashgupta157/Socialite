import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import selectedSlice from "./slices/selectedSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    selection: selectedSlice,
  },
});
