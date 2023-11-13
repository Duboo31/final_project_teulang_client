import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/modules/users";
import { useNavigate } from "react-router-dom";

const IsLoginNavi = ({ users }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onClickLogoutBtnHandler = () => {
    dispatch(logout());
  };

  // 리덕스 스토어의 현재 계정 정보
  const user = useSelector(({ users }) => {
    return users;
  });

  const onClickUserNicknameHandler = () => {
    console.log("유저 이름 클릭");
    navigate(`/profile/${user.userId}`);
  };

  return (
    <span>
      <span onClick={onClickUserNicknameHandler}>{users.userNickname}님</span>
      <button onClick={onClickLogoutBtnHandler}>로그아웃</button>
    </span>
  );
};

export default IsLoginNavi;
