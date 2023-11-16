import React from "react";
import { Link } from "react-router-dom";

// css
import "../../styles/navigation/header.css";

const IsLogoutNavi = ({ setIsNaviActive }) => {
  return (
    <div className="navigation_header">
      <Link
        onClick={() => {
          setIsNaviActive((cur) => !cur);
        }}
        className="navigation_header-item"
        to="/register"
      >
        회원가입
      </Link>
      <Link
        onClick={() => {
          setIsNaviActive((cur) => !cur);
        }}
        className="navigation_header-item"
        to="/login"
      >
        로그인
      </Link>
    </div>
  );
};

export default IsLogoutNavi;
