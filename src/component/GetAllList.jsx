import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "../api/recipes/axios";
import urls from "../shared/url";
import default_thumbnail from "../images/default_thumbnail.jpg";

export default function GetAllList({ fetchUrl, isRecipe = false }) {
  const [articlesList, setArticlesList] = useState([]);
  const navigate = useNavigate();
  const [maxPage, setMaxPage] = useState(0);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const curPage = query.get("page");
  const option = query.get("option");
  const optionUrl = (option && isRecipe) ? `&option=${option}` : "";
  console.log("option:", option);

  useEffect(() => {
    if (curPage !== null) {
      fetchArticlesList(curPage);
    } else {
        fetchArticlesList();
    }
  }, [curPage, option]);

  const fetchArticlesList = async (curPage = 1) => {
    try {
      const request = await axios.get(fetchUrl + `?page=${curPage}` + optionUrl);
      console.log(
        "fetchFreeArticlesList-pagenation_data: ",
        request.data.pagenation_data
      );
      console.log(
        "fetchFreeArticlesList-serializer_data: ",
        request.data.serializer_data
      );
      setArticlesList(request.data.serializer_data);
      setMaxPage(request.data.pagenation_data.pages_num);
    } catch (error) {
      console.log("error", error);
    }
  };

  const pagination_btn = [];
  const pagination = () => {
    console.log("maxPage", maxPage);
    for (let i = 1; i < maxPage + 1; i++) {
      pagination_btn.push(
        <button name={`${i}`} onClick={handleMove} className="pagination_btn">
          {i}
        </button>
      );
    }
    console.log(pagination_btn);
    const start = parseInt(curPage / 5) * 5;
    const end = maxPage > start + 5 ? start + 5 : maxPage;
    return pagination_btn.slice(start, end);
  };

  const handleMove = (e) => {
    const { name } = e.target;
    console.log(name);
    var go = 0;

    if (name === "prev") {
      go = (parseInt((curPage - 1) / 5) - 1) * 5 + 1; // ex: 현재 6~10페이지라면, 1페이지로.
    } else if (name === "next") {
      go = (parseInt((curPage - 1) / 5) + 1) * 5 + 1; // ex: 현재 6~10페이지라면, 11페이지로.
    } else {
      go = name;
    }

    if (go > 0 && go <= maxPage) {
      isRecipe
        ? navigate(`/recipe?page=${go}`+optionUrl)
        : navigate(`/article?page=${go}`+optionUrl);
    }
  };

  const handleSort = (e) => {
    const { value } = e.target;
    navigate(`/recipe?page=1&option=${value}`)
  }

  return (
    <div>
      {articlesList.length > 0 ? (
        <div>
            {isRecipe &&
            <select value={option ? option : "bookmark"} onChange={handleSort}>
                <option value="bookmark">인기순</option>
                <option value="latest">최신순</option>
            </select>
            }
        {console.log("articlesList", articlesList)}
          {articlesList.map((article) => {
            // thumbnail 설정
            let thumbnail = "";
            if (isRecipe) {
              thumbnail = article.api_recipe
                ? `${article.recipe_thumbnail_api}`
                : `${urls.baseURL}${article.recipe_thumbnail}`;
            } else {
              thumbnail = article.images
                ? urls.baseURL + article.images[0].free_image
                : default_thumbnail;
            }
            // content(description) 설정
            const all_content = isRecipe ? article.description : article.content;
            const content = all_content
            ? all_content.length > 13
              ? all_content.substr(0, 13) + " ..."
              : all_content
            : "-"
            return (
              <div
                onClick={() => {
                  isRecipe
                    ? navigate(`/recipe/${article.id}`)
                    : navigate(`/article/${article.id}`);
                }}
                key={article.id}
              >
                <p>title : {article.title}</p>
                <img src={thumbnail} style={{ width: "200px" }} />
                <span>author: {article.user_data.nickname}</span>
                <br />
                {!isRecipe && <span>category: {article.category}</span>}
                {isRecipe && <span>
                    <span>star_avg: {article.star_avg}</span>
                    <span>bookmarks: {article.bookmark_count}</span>
                    </span>}
                <span>content: {content}</span>
              </div>
            );
          })}
          <div className="pagination">
            <button
              name="prev"
              onClick={handleMove}
              className="pagination_btn_prev"
            >
              {"<"}
            </button>
            {pagination()}
            <button
              name="next"
              onClick={handleMove}
              className="pagination_btn_next"
            >
              {">"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
}
