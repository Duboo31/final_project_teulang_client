import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/recipes/axios";
import requests from "../api/recipes/requests";

// components
import RecipeDetail from "./RecipeDetail";
import Comments from "./Comments";

export default function RecipeDetailForm({ recipeId }) {
  const navigate = useNavigate();
  const [recipeDetail, setRecipeDetail] = useState([]);

  useEffect(() => {
    fetchRecipeDetailData();
  }, [recipeId]);

  const fetchRecipeDetailData = async () => {
    const accesstoken = localStorage.getItem("access");


    try {
      if (accesstoken) {
        const request = await axios.get(requests.fetchRecipeListAll + recipeId, {
          headers: {
            Authorization: `Bearer ${accesstoken}`
          },
        })
        setRecipeDetail(request.data);
        // console.log("fetchRecipeDetailData", request.data);
      }
      else {
        const request = await axios.get(requests.fetchRecipeListAll + recipeId)
        setRecipeDetail(request.data);
        // console.log("fetchRecipeDetailData", request.data);
      };
    } catch (error) {
      console.log(error);
      navigate("/*"); // NotFound 페이지로 이동.
    }
  };

  return (
    <div>
      <RecipeDetail recipeDetail={recipeDetail} />
      <Comments
        recipeComments={recipeDetail.article_recipe_comment}
        recipeId={recipeId}
        fetchUrl={`/articles/recipe/${recipeId}/comment/`}
      />
    </div>
  );
}
