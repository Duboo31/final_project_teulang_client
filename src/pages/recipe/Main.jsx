import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Row from "../../component/Row";
import requests from "../../api/recipes/requests";
import ArticleRow from "../../component/ArticleRow";

import { useDispatch, useSelector } from "react-redux";

import { saveLocalStorageToken } from "../../api/user/saveLocalToken";
import { getUserInfoInLocalStorage } from "../../js/isLoginUser";

import { login } from "../../redux/modules/users";

const Main = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    let searchParma = window.location.search;

    if (searchParma) {
      let resultParms = searchParma
        .split("=")
        .join(" ")
        .split("&")
        .join(" ")
        .split(" ");

      saveLocalStorageToken(resultParms[3], resultParms[1]);

      const { userId, userEmail, nickname } = getUserInfoInLocalStorage();

      dispatch(
        login({
          isAuthorized: true,
          userEmail: userEmail,
          userNickname: nickname,
          userId: userId,
          userProfile: "/media/user_defalt.jpg",
        })
      );
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Row
        title="인기 레시피"
        id="PR"
        fetchUrl={requests.fetchRecipeListBookmarks}
        option="bookmark"
      />
      <Row
        title="최신 레시피"
        id="LR"
        fetchUrl={requests.fetchRecipeListLatest}
        option="latest"
      />
      {/* <ArticleRow
        title="게시글"
        id="Article"
        fetchUrl={requests.fetchFreeList}
      /> */}
    </div>
  );
};

export default Main;
