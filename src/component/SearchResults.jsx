import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/recipes/axios";
import urls from "../shared/url";
import "../styles/SearchResults.css";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [maxPage, setMaxPage] = useState(0);
  const pagination_btn = [];
  const pagination_btn_show = [];

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();

  const searchTermString = query.get("q");
  const searchTerms = searchTermString ? searchTermString.split(",") : [];
  let searchTerm = "";
  let updatedSearchTerm = "";
  const curPage = query.get("page");

  for (let i = 0; i < searchTerms.length; i++) {
    if (i === searchTerms.length - 1) {
      // 검색어 마지막에는 쉼표 빼기.
      updatedSearchTerm += searchTerms[i];
    } else {
      updatedSearchTerm += searchTerms[i] + ",";
    }
  }
  searchTerm = updatedSearchTerm;

  useEffect(() => {
    if (searchTerms && curPage) {
      fetchSearchRecipe(searchTerm, curPage);
    }
  }, [searchTermString, curPage]);

  const fetchSearchRecipe = async (searchTerm, curPage = 1) => {
    try {
      const response = await axios.get(
        `articles/recipe/search?q=${searchTerm}&page=${curPage}`
      );
      setSearchResults(response.data.serializer_data);
      console.log(response.data.pagination_data);
      setMaxPage(response.data.pagination_data.pages_num);
    } catch (error) {
      console.log("error", error);
    }
  };

  const pagination = () => {
    for (let i = 1; i < maxPage + 1; i++) {
      pagination_btn.push(
        <button
          name={`${i}`}
          onClick={handleMove}
          className="search_pagination_btn"
        >
          {i}
        </button>
      );
    }
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
      navigate(`/search?q=${searchTerm}&page=${go}`);
    }
  };

  const renderSearchRecipes = () => {
    return searchResults.length > 0 ? (
      <section className="search_section">
        {searchResults.map((recipe, index) => {
          const recipeImageUrl = recipe.api_recipe
            ? `${recipe.recipe_thumbnail_api}`
            : `${urls.baseURL}${recipe.recipe_thumbnail}`;

          const created_at = recipe.api_recipe
            ? "api recipe"
            : recipe.created_at.split("T")[0] +
              " " +
              recipe.created_at.split("T")[1].substr(0, 5);
          return (
            <div key={index} className="search_each_recipe">
              <div
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                className="search_recipe_content"
              >
                <div className="search_recipe_left">
                  <div className="search_recipe_title_div">
                    <p className="search_recipe_title">{recipe.title.length > 13 ? recipe.title.substr(0,13)+" ..." : recipe.title}</p>
                  </div>
                  <div className="search_recipe_desc_div">
                    <p className="search_recipe_desc">
                      {recipe.description
                        ? recipe.description.length > 55
                          ? recipe.description.substr(0, 55) + " ... 더보기"
                          : recipe.description
                        : "-"}
                    </p>
                  </div>
                  <div className="search_recipe_left_footer">
                    <span className="search_recipe_star_avg">
                      별점: {recipe.star_avg ? recipe.star_avg : "-"}
                    </span>
                    <span className="search_recipe_bookmark_count">
                      북마크: {recipe.bookmark_count}
                    </span>
                  </div>
                </div>
                <img
                  src={recipeImageUrl}
                  alt="recipe"
                  className="search_recipe_thumbnail"
                />
              </div>

              <div className="search_recipe_footer">
                <div
                  onClick={() => navigate(`/profile/${recipe.user_data_id}`)}
                  className="search_recipe_author"
                >
                  <img
                    src={`${urls.baseURL}${recipe.user_data.user_img}`}
                    alt="user_img"
                    className="search_recipe_author_img"
                  />
                  <span className="search_recipe_author_nickname">
                    {recipe.author}
                  </span>
                </div>
                <span className="search_recipe_created_at">{created_at}</span>
              </div>
            </div>
          );
        })}
        <div className="search_pagination">
          <button
            name="prev"
            onClick={handleMove}
            className="search_pagination_btn_prev"
          >
            {"<"}
          </button>
          {pagination()}
          <button
            name="next"
            onClick={handleMove}
            className="search_pagination_btn_next"
          >
            {">"}
          </button>
        </div>
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자하는 검색어"{searchTermString}"에 맞는 게시글이 없습니다.</p>
        </div>
      </section>
    );
  };

  return renderSearchRecipes();
};

export default SearchResults;
