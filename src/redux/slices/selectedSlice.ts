import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState: any = {
  selected: "Home",
};
const selectedSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    SELECTION: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        selected: action.payload,
      };
    },
  },
});
export const { SELECTION } = selectedSlice.actions;
export default selectedSlice.reducer;
