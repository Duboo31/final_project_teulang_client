import React from "react";
import { useSelector } from "react-redux";

const Main = () => {
  const users = useSelector(({ users }) => {
    return users;
  });

  console.log("mian redux data: ", users);

  return <div></div>;
};

export default Main;
