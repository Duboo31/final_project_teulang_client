import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../../component/Comments";
import RecipeDetail from "../../component/RecipeDetail";
import axios from "../../api/recipes/axios";
import requests from "../../api/recipes/requests";

export default function DetailPage() {
  const [recipeDetail, setRecipeDetail] = useState([]);
  const { recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipeDetailData();
  }, [recipeId]);

  const fetchRecipeDetailData = async () => {
    try {
        const request = await axios.get(requests.fetchRecipeList + recipeId);
        // console.log("request from page: ", request.data);
        // console.log("request.comments", request.data.article_recipe_comment);
        setRecipeDetail(request.data);
    } catch (error) {
        navigate('/*'); // NotFound 페이지로 이동.
    }
  };

  return (
    <div>
      <RecipeDetail recipeDetail={recipeDetail} />
      <Comments recipeComments={recipeDetail.comments}/>
    </div>
  );
}
