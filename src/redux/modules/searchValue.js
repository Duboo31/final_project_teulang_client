import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const counterSlice = createSlice({
  name: "searchValue",
  initialState,
  reducers: {
    updateByValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateByValue } = counterSlice.actions;
export default counterSlice.reducer;
