import React from "react";
import { Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <nav>네비게이션</nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navigation;
