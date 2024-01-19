import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState: any = {
  user: [],
  isAuthenticated: false,
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
