import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  post: null,
};
const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    UPDATE_FEED: (state, action) => {
      state.post = action.payload;
    },
  },
});
export const { UPDATE_FEED } = feedSlice.actions;
export default feedSlice.reducer;
