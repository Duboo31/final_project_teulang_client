import React, { useEffect } from "react";
import urls from "../shared/url";

const RecipeDetail = ({ recipeDetail }) => {
  return (
    <div>
      {recipeDetail.id !== undefined 
      ? ( // recipeDetail에 fetch 된 값이 담긴 경우.
        <div>
          <h2>Recipe Detail</h2>
          <p>author : {recipeDetail.author}</p>
          <p>title : {recipeDetail.title}</p>
          <p>평균 별점 : {recipeDetail.star_avg}</p>
          <img
            style={{ width: "300px" }}
            src={
              recipeDetail.api_recipe
                ? `${urls.foodSafetyKoreaURL}${recipeDetail.recipe_thumbnail.split("www.foodsafetykorea.go.kr")[1]} ` // api_recipe인 경우 식품안전나라에서 이미지 가져옴.
                : `${urls.baseURL}${recipeDetail.recipe_thumbnail} ` // api_recipe가 아닌 경우 서버에서 이미지 가져옴.
            }
            alt="recipe_thumbnail"
          />
          <p>title : {recipeDetail.title}</p>
          <div>
            ingredient :
            {recipeDetail.recipe_ingredients.map((ingredientObject) => {
              return <div key={ingredientObject.id}>{ingredientObject.ingredients}</div>; // map에는 return이 있어야 한다!
            })}
          </div>
          <p>
            desc:{" "}
            {recipeDetail.description
              ? recipeDetail.description
              : "설명이 비어있습니다."}
          </p>
          <p>recipe orders :</p>
          <div>
            {recipeDetail.recipe_order.map((orderObject) => {
              return (
                <div key={orderObject.id}>
                  {recipeDetail.api_recipe 
                    ? (<img src={`${urls.foodSafetyKoreaURL}${orderObject.recipe_img.split("www.foodsafetykorea.go.kr")[1]}`}/>) 
                    : (<img src={orderObject.recipe_img ? `${urls.baseURL}${orderObject.recipe_img}` : ""} style={{width: "100px"}}/>)
                  }
                  {!recipeDetail.api_recipe && orderObject.order}{" "}{orderObject.content} {/*content 뒤에 알파벳 붙어나오고(맨 앞 레시피만), 앞에 1. 이런 순서 번호가 붙음.*/}
                </div>
              ); 
            })}
          </div>
        </div>
      ) 
      : ( // recipeDetail에 fetch 된 값이 아직 담기지 않은 경우.
        <h2>loading recipe details</h2>
      )}
    </div>
  );
};

export default RecipeDetail;
