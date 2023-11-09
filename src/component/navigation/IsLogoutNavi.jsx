import React from "react";
import { Link } from "react-router-dom";

const IsLogoutNavi = () => {
  return (
    <div>
      <Link to="/register">회원가입</Link>
      <Link to="/login">로그인</Link>
    </div>
  );
};

export default IsLogoutNavi;
