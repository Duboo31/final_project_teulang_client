import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "../../component/Comments";
import RecipeDetail from "../../component/RecipeDetail";
import axios from "../../api/recipes/axios";
import requests from "../../api/recipes/requests";

export default function DetailPage() {
  const [recipeDetail, setRecipeDetail] = useState([]);
  const { recipeId } = useParams();

  useEffect(() => {
    fetchRecipeDetailData();
  }, [recipeId]);

  const fetchRecipeDetailData = async () => {
    const request = await axios.get(requests.fetchRecipeList + recipeId);
    console.log("request from page: ", request.data);
    setRecipeDetail(request.data);
  };

  return (
    <div>
      <RecipeDetail recipeDetail={recipeDetail} />
      <Comments />
    </div>
  );
}
