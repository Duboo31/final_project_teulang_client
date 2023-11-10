import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/modules/users";

const IsLoginNavi = ({ users }) => {
  const dispatch = useDispatch();

  const onClickLogoutBtnHandler = () => {
    dispatch(logout());
  };

  const onClickUserNicknameHandler = () => {
    console.log("유저 이름 클릭");
  };

  return (
    <span>
      <span onClick={onClickUserNicknameHandler}>{users.userNickname}님</span>
      <button onClick={onClickLogoutBtnHandler}>로그아웃</button>
    </span>
  );
};

export default IsLoginNavi;
