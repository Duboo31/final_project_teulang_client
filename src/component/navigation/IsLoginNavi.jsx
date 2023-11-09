import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/modules/users";

const IsLoginNavi = ({ users }) => {
  const dispatch = useDispatch();

  const onClickLogoutBtnHandler = () => {
    dispatch(logout());
  };

  return (
    <span>
      <span>{users.userNickname}님</span>
      <button onClick={onClickLogoutBtnHandler}>로그아웃</button>
    </span>
  );
};

export default IsLoginNavi;
