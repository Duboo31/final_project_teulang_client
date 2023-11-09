import { createSlice } from "@reduxjs/toolkit";
import { getUserInfoInLocalStorage } from "../../js/isLoginUser";

// 초기 상태값(state)
const initialState = {
  isAuthorized: false,
  userId: "",
  userEmail: "",
  userNickname: "",
};

const userInfo = getUserInfoInLocalStorage();

if (userInfo) {
  const { userId, userEmail, nickname } = userInfo;

  initialState.isAuthorized = true;
  initialState.userId = userId;
  initialState.userEmail = userEmail;
  initialState.userNickname = nickname;
}

const counterSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthorized = true;
      state.userEmail = action.payload.userEmail;
      state.userId = action.payload.userId;
      state.userNickname = action.payload.userNickname;
    },
    logout: (state) => {
      state.isAuthorized = false;
      state.userEmail = "";
      state.userId = "";
      state.userNickname = "";
      localStorage.clear();
    },
  },
});

export default counterSlice.reducer;
export const { login, logout } = counterSlice.actions;
