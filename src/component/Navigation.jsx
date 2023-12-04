import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import IsLoginNavi from "./navigation/IsLoginNavi";
import IsLogoutNavi from "./navigation/IsLogoutNavi";
import Search from "./Search";

import logo from "../image/logo.png";
import logoWeb from "../image/logoWeb.png";

// css
import "../styles/navigation/searchBar.css";
import "../styles/navigation/navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const [isNaviActive, setIsNaviActive] = useState(false);

  const users = useSelector(({ users }) => {
    return users;
  });

  return (
    <>
      <div
        className={
          isNaviActive ? "navigation-wrap web-nav" : "navigation-wrap active"
        }
      >
        <div className="navigation-upper">
          {users.isAuthorized ? (
            <IsLoginNavi setIsNaviActive={setIsNaviActive} users={users} />
          ) : (
            <IsLogoutNavi setIsNaviActive={setIsNaviActive} />
          )}
          <div
            className={
              isNaviActive
                ? "navigation-icon_box"
                : "navigation-icon_box active"
            }
          >
            <FontAwesomeIcon
              onClick={() => {
                setIsNaviActive((cur) => !cur);
              }}
              icon={faXmark}
              className="navigation-icon_item"
            />
          </div>
        </div>
        <div className="searchBar-container">
          <h2 className="searchBar-container_title">
            <Link to="/">
              <img
                onClick={() => {
                  setIsNaviActive((cur) => !cur);
                }}
                className="logo-img"
                src={logo}
                alt="로고"
              />
              <h1 className="logo-img_web">
                <span>털랭</span>
                <span>우리집 냉장고 레시피</span>
              </h1>
            </Link>
          </h2>
          <Search setIsNaviActive={setIsNaviActive} />
          <div className="searchBar-container_multi">
            <Link
              to={users.isAuthorized ? "/multi" : "/login"}
              onClick={() => {
                setIsNaviActive((cur) => !cur);
              }}
            >
              함께보기
            </Link>
          </div>
        </div>
        <nav className="navigation-lower">
          <ul>
            <li>
              <Link
                onClick={() => {
                  setIsNaviActive((cur) => !cur);
                }}
                to="/recipe?page=1"
              >
                전체 레시피ㅋ
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setIsNaviActive((cur) => !cur);
                }}
                to="/article?page=1"
              >
                자유 게시판
              </Link>
            </li>

            <li>
              <Link
                onClick={() => {
                  setIsNaviActive((cur) => !cur);
                }}
                to={users.isAuthorized ? "/create" : "/login"}
              >
                레시피 작성
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setIsNaviActive((cur) => !cur);
                }}
                to={users.isAuthorized ? "/article/create" : "/login"}
              >
                게시글 작성
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <main>
        <FontAwesomeIcon
          onClick={() => {
            setIsNaviActive((cur) => !cur);
          }}
          icon={faBars}
          className="navigation-icon_menu"
        />
        <Outlet />
      </main>
    </>
  );
};

export default Navigation;
