import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import IsLoginNavi from "./navigation/IsLoginNavi";
import IsLogoutNavi from "./navigation/IsLogoutNavi";
import Search from "./Search";
import MultiViewPage from "../pages/recipe/MultiViewPage";

const Navigation = () => {
  const users = useSelector(({ users }) => {
    return users;
  });

  return (
    <>
      <div>
        {users.isAuthorized ? <IsLoginNavi users={users} /> : <IsLogoutNavi />}
      </div>
      <div>관리자 문의(미구현)</div>
      <div>
        <span>
          <Link to="/">홈</Link>
        </span>
        <Search />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/multi">함께보기</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/create">레시피 작성하기</Link>
          </li>
          <li>게시글 작성하기(미구현)</li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navigation;
