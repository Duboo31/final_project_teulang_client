import React from "react";
import urls from "../shared/url";

const RecipeDetail = ({ recipeDetail }) => {
  return (
    <div>
      <h2>Recipe Detail</h2>
      <p>author : {recipeDetail.author}</p>
      <p>title : {recipeDetail.title}</p>
      <p>평균 별점 : {recipeDetail.star_avg}</p>
      <img
        style={{ width: "300px" }}
        src={
          recipeDetail.api_recipe
            ? `${urls.foodSafetyKoreaURL}/${
                recipeDetail.recipe_thumbnail.split("media")[1]
              } `
            : `${urls.baseURL}/${recipeDetail.recipe_thumbnail} `
        }
        alt="recipe_thumbnail"
      />
      <p>title : {recipeDetail.title}</p>
    </div>
  );
};

export default RecipeDetail;
