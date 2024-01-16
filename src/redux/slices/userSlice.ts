import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const User = sessionStorage.getItem("user");
const initialState: any = {
  user: User ? JSON.parse(User) : [],
  isAuthenticated: User ? true : false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    },
  },
});
export const { LOGIN } = userSlice.actions;
export default userSlice.reducer;
