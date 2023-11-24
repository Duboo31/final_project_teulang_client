import React from "react";
// import { useSelector } from "react-redux";
import Row from "../../component/Row";
import requests from "../../api/recipes/requests";
import ArticleRow from "../../component/ArticleRow";

const Main = () => {
  // const users = useSelector(({ users }) => {
  //   return users;
  // });

  // console.log("redux data: ", users);

  return (
    <div>
      <Row
        title="인기 레시피"
        id="PR"
        fetchUrl={requests.fetchRecipeListBookmarks}
      />
      <Row title="최신 레시피" id="LR" fetchUrl={requests.fetchRecipeListLatest} />
      <ArticleRow title="게시글" id="Article" fetchUrl={requests.fetchFreeList}/>
    </div>
  );
};

export default Main;
