import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "../api/recipes/axios";
import urls from "../shared/url";
import default_thumbnail from "../images/default_thumbnail.jpg";
import bookmarked_icon from "../images/bookmarked.png";
import full_star from "../images/star_full.png";
import "../styles/GetAllList.css";
import "../styles/SearchResults.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
  const optionUrl = option && isRecipe ? `&option=${option}` : "";
  // console.log("option:", option);

  useEffect(() => {
    if (curPage !== null) {
      fetchArticlesList(curPage);
    } else {
      fetchArticlesList();
    }
  }, [curPage, option]);

  const fetchArticlesList = async (curPage = 1) => {
    try {
      const request = await axios.get(
        fetchUrl + `?page=${curPage}` + optionUrl
      );
      // console.log(
      //   "fetchFreeArticlesList-pagenation_data: ",
      //   request.data.pagenation_data
      // );
      // console.log(
      //   "fetchFreeArticlesList-serializer_data: ",
      //   request.data.serializer_data
      // );
      setArticlesList(request.data.serializer_data);
      setMaxPage(request.data.pagenation_data.pages_num);
    } catch (error) {
      console.log("error", error);
    }
  };

  const pagination_btn = [];
  const pagination = () => {
    for (let i = 1; i < maxPage + 1; i++) {
      if (`${i}` === curPage) {
        // console.log("curPage - i", i);
        pagination_btn.push(
          <button
            name={`${i}`}
            onClick={handleMove}
            className="pagination_cur_btn"
          >
            {i}
          </button>
        );
      } else {
        pagination_btn.push(
          <button
            name={`${i}`}
            onClick={handleMove}
            className="pagination_btn"
          >
            {i}
          </button>
        );
      }
    }
    const start = parseInt((curPage - 1) / 5) * 5;
    const end = maxPage > start + 5 ? start + 5 : maxPage;
    return pagination_btn.slice(start, end);
  };

  const handleMove = (e) => {
    const { name } = e.target;
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
        ? navigate(`/recipe?page=${go}` + optionUrl)
        : navigate(`/article?page=${go}` + optionUrl);
    }
  };

  const handleSort = (e) => {
    const { value } = e.target;
    navigate(`/recipe?page=1&option=${value}`);
  };

  return (
    <div className="all-article_wrap">
      {articlesList.length > 0 ? (
        <div>
          {isRecipe && (
            <select
              value={option ? option : "bookmark"}
              onChange={handleSort}
              className="all_list_sort_option"
            >
              <option value="bookmark">인기순</option>
              <option value="latest">최신순</option>
            </select>
          )}
          {/* {console.log("articlesList", articlesList)} */}
          <ul className="article-header_list">
            {!isRecipe && <li className="article-header_item">카테고리</li>}
            {isRecipe && <li className="article-header_item">별점</li>}
            <li className="article-header_item">제목</li>
            <li className="article-header_item">닉네임</li>
            <li className="article-header_item">작성시간</li>
          </ul>
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
            const all_content = isRecipe
              ? article.description
              : article.content;
            const content = all_content
              ? all_content.length > 13
                ? all_content.substr(0, 13) + " ..."
                : all_content
              : "내용이 없습니다.";
            return (
              <div key={article.id} className="each_article">
                <div className="each_article_container">
                  <div className="each_article_header">
                    {!isRecipe ? (
                      <div className="each_article_header_right">
                        <span className="each_article_header_category">
                          {article.category === "review" ? "리뷰" : "자유"}
                        </span>
                      </div>
                    ) : (
                      <span className="each_article_header_right">
                        <div className="each_article_header_star_div">
                          <img
                            src={full_star}
                            className="each_article_header_star_img"
                          />
                          <span className="each_article_header_star">
                            {article?.star_avg}
                          </span>
                        </div>
                        {/* <div className="each_article_header_bookmark_div">
                          <img
                            src={bookmarked_icon}
                            className="each_article_header_bookmark_img"
                          />
                          <span className="each_article_header_bookmark">
                            {article.bookmark_count}
                          </span>
                        </div> */}
                      </span>
                    )}
                    <p
                      onClick={() => {
                        isRecipe
                          ? navigate(`/recipe/${article.id}`)
                          : navigate(`/article/${article.id}`);
                      }}
                      className="each_article_header_title"
                    >
                      {article.title}
                    </p>
                  </div>
                  <div className="each_article_footer">
                    <span
                      className="each_article_author"
                      onClick={() => {
                        navigate(`/profile/${article.user_data.id}`);
                      }}
                    >
                      {/* <img
                        src={urls.baseURL + article.user_data.user_img}
                        className="each_article_author_img"
                      /> */}
                      <span className="each_article_author_nickname">
                        {article.user_data.nickname}
                      </span>
                    </span>
                    <p className="each_article_created_at">
                      {
                        article.created_at.split("T")[0]
                        //   " " +
                        // article.created_at.split("T")[1].substr(0, 5)
                      }
                    </p>
                  </div>
                </div>

                <div className="each_article_body">
                  <span className="each_article_content">{content}</span>
                  {/* <img src={thumbnail} className="each_article_thumbnail" /> */}
                </div>
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
