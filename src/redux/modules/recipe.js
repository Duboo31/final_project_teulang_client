import { createSlice } from "@reduxjs/toolkit";

// 초기 상태값(state)
const initialState = {
  value: "",
};

const counterSlice = createSlice({
  name: "recipe",
  initialState,
  // reducers: {
  //   addNumber: (state, action) => {
  //     state.number = state.number + action.payload;
  //   },
  // },
});

export default counterSlice.reducer;
// export const {  } = counterSlice.actions;
