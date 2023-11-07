import React from "react";
import { useSelector } from "react-redux";

const Main = () => {
  const users = useSelector(({ users }) => {
    return users;
  });

  console.log("redux data: ", users);

  return <div>메인 페이지</div>;
};

export default Main;
