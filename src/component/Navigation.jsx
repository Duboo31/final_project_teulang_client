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
      <div>관리자 문의</div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navigation;
