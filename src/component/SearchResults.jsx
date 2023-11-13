import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/recipes/axios";
import urls from "../shared/url";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();

  const searchTermString = query.get("q");
  const searchTerms = searchTermString.split(",");
  let searchTerm = "";
  let updatedSearchTerm = "";

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
    if (searchTerms) {
      fetchSearchRecipe(searchTerm);
    }
  }, [searchTermString]);

  const fetchSearchRecipe = async (searchTerm) => {
    try {
      const request = await axios.get(`articles/recipe/search?q=${searchTerm}`);
      setSearchResults(request.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const renderSearchRecipes = () => {
    return searchResults.length > 0 ? (
      <section>
        {searchResults.map((recipe, index) => {
          const recipeImageUrl = recipe.api_recipe
            ? `${urls.foodSafetyKoreaURL}${
                recipe.recipe_thumbnail.split("www.foodsafetykorea.go.kr")[1]
              }`
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
