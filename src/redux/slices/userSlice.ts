import { createSlice } from "@reduxjs/toolkit";
const userFromStorage = (sessionStorage.getItem("user") as string)
  ? JSON.parse(sessionStorage.getItem("user") as string)
  : null;
const initialState = {
  user: userFromStorage,
  isAuthenticated: !!userFromStorage,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    LOGOUT: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("user");
    },
  },
});

export const { LOGIN, LOGOUT } = userSlice.actions;
export default userSlice.reducer;
