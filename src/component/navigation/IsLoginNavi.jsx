import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/modules/users";
import { useNavigate } from "react-router-dom";

// css
import "../../styles/navigation/header.css";

const IsLoginNavi = ({ users, setIsNaviActive }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onClickLogoutBtnHandler = () => {
    dispatch(logout());
    setIsNaviActive((cur) => !cur);
    navigate("/");
  };

  // 리덕스 스토어의 현재 계정 정보
  const user = useSelector(({ users }) => {
    return users;
  });

  const onClickUserNicknameHandler = () => {
    navigate(`/profile/${user.userId}`);
    setIsNaviActive((cur) => !cur);
  };

  return (
    <div className="navigation_header">
      <div
        className="navigation_header-item"
        onClick={onClickUserNicknameHandler}
      >
        <p className="navigation_header-name">{users.userNickname}</p>님
      </div>
      <button
        className="navigation_header-item"
        onClick={onClickLogoutBtnHandler}
      >
        로그아웃
      </button>
    </div>
  );
};

export default IsLoginNavi;
