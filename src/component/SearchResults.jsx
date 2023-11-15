import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/recipes/axios";
import urls from "../shared/url";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [maxPage, setMaxPage] = useState(0);
  const pagination_btn = []
  const pagination_btn_show = []

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();

  const searchTermString = query.get("q");
  const searchTerms = (searchTermString ? searchTermString.split(",") : []);
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

  const fetchSearchRecipe = async (searchTerm, curPage=1) => {
    try {
      const response = await axios.get(`articles/recipe/search?q=${searchTerm}&page=${curPage}`);
      setSearchResults(response.data.serializer_data);
      console.log(response.data.pagination_data)
      setMaxPage(response.data.pagination_data.pages_num);
    } catch (error) {
      console.log("error", error);
    }
  };

  const pagination = () => {
    for (let i = 1; i<maxPage+1; i++) {
      pagination_btn.push(<button name={`${i}`}>{i}</button>)
    }
    const start = parseInt(curPage/5) * 5;
    const end = (maxPage > (start + 5) ? (start + 5) : maxPage);
    return pagination_btn.slice(start, end);
  }
  
  const handleMove = (e) => {
    const {name} = e.target;
    var go = 0;

    if (name === "prev"){
      go = (parseInt((curPage - 1)/5) - 1) * 5 + 1; // ex: 현재 6~10페이지라면, 1페이지로.
    } else {
      go = (parseInt((curPage - 1)/5) + 1) * 5 + 1; // ex: 현재 6~10페이지라면, 11페이지로.
    }

    if (go > 0 && go < maxPage) {
      navigate(`/search?q=${searchTerm}&page=${go}`)
    }
  }

  const renderSearchRecipes = () => {
    return searchResults.length > 0 ? (
      <section>
        {searchResults.map((recipe, index) => {
          const recipeImageUrl = recipe.api_recipe
            ? `${recipe.recipe_thumbnail_api}`
            : `${urls.baseURL}${recipe.recipe_thumbnail}`;
          return (
            <div key={index}>
              {" "}
              {/* recipe.id로 넣고싶은데, 현재 백엔드에서 같은 id로 여러 개가 넘어옴. 이런 경우 재렌더링될 때 그 key 값의 하나의 div만 없어짐. */}
              <div onClick={() => navigate(`/recipe/${recipe.id}`)}>
                <img
                  src={recipeImageUrl}
                  alt="recipe"
                  style={{ width: "200px" }}
                />
              </div>
            </div>
          );
        })}
        <div>
          <button name="prev" onClick={handleMove}>{"<"}</button>
          {pagination()}
          <button name="next" onClick={handleMove}>{">"}</button>
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
