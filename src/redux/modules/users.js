import { createSlice } from "@reduxjs/toolkit";
import { getUserInfoInLocalStorage } from "../../js/isLoginUser";

// 초기 상태값(state)
const initialState = {
  isAuthorized: false,
  userId: "",
  userEmail: "",
  userNickname: "",
  userProfile: "",
};

const userInfo = getUserInfoInLocalStorage();

if (userInfo) {
  const { userId, userEmail, nickname, profileImg } = userInfo;

  const localNickname = localStorage.getItem("nickname");

  initialState.isAuthorized = true;
  initialState.userId = userId;
  initialState.userEmail = userEmail;
  initialState.userProfile = profileImg;
  if (localNickname === null) {
    initialState.userNickname = nickname;
  } else {
    initialState.userNickname = localNickname;
  }
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
    modify: (state, action) => {
      state.userNickname = action.payload.userNickname;
    },
  },
});

export default counterSlice.reducer;
export const { login, logout, modify } = counterSlice.actions;
