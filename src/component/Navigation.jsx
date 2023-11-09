import React from "react";
import { Outlet, Link } from "react-router-dom";
import { logout } from "../redux/modules/users";
import { useDispatch } from "react-redux";

const Navigation = () => {
  const dispatch = useDispatch();

  return (
    <>
      <nav>네비게이션</nav>
      <Link to="login">로그인 ㄱ</Link>
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        로그아웃
      </button>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navigation;
