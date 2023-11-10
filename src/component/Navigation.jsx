import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import IsLoginNavi from "./navigation/IsLoginNavi";
import IsLogoutNavi from "./navigation/IsLogoutNavi";

const Navigation = () => {
  const users = useSelector(({ users }) => {
    return users;
  });

  console.log(users);

  return (
    <>
      <div>
        {users.isAuthorized ? <IsLoginNavi users={users} /> : <IsLogoutNavi />}
      </div>
      <div>관리자 문의(기능 미구현으로 예상)</div>
      <div>
        <span>홈/로고</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>검색 바 위치로 예상됩니다(컴포넌트라면 여기에 추가 가능)</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          <span>함께보기? 기능</span>
        </span>
      </div>
      <nav>
        <ul>
          <li>최신 레시피</li>
          <li>인기 레시피</li>
          <li>레시피 작성하기</li>
          <li>게시글 작성하기</li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navigation;
