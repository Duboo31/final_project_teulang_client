import React, { useEffect } from "react";
import urls from "../shared/url";
import axios from "../api/recipes/axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const RecipeDetail = ({ recipeDetail }) => {
  const navigate = useNavigate();

  // 로그인 된 유저 정보
  const user = useSelector(({ users }) => {
    return users;
  });

  const handleDeleteRecipe = async () => {
    const accessToken = localStorage.getItem("access");

    await axios
    .delete(
      `/articles/recipe/${recipeDetail.id}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(function (response) {
      console.log("reponse.data ", response.data);
      navigate("/");
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  const handleUpdateRecipe = () => {
    navigate("/create", { state: { recipeDetail } });
  }

  return (
    <div>

      {recipeDetail.id !== undefined 
      ? ( // recipeDetail에 fetch 된 값이 담긴 경우.
        <div>
          {(user.userId === recipeDetail.user_data.id) && <button onClick={handleUpdateRecipe}>게시글 수정</button>}
          {(user.userId === recipeDetail.user_data.id) && <button onClick={handleDeleteRecipe}>게시글 삭제</button>}
          
          <img src={`${urls.baseURL}${recipeDetail.user_data.user_img}`} style={{width: "50px"}}/>
          <span onClick={() => {navigate(`/profile/${recipeDetail.user_data.id}`)}}>author : {recipeDetail.author}</span> <br/>

          <span>title : {recipeDetail.title}</span> <br/>

          <span>평균 별점 : {recipeDetail.star_avg}</span> <br/>

          <img
            style={{ width: "300px" }}
            src={
              recipeDetail.api_recipe
                ? `${recipeDetail.recipe_thumbnail_api} ` // api_recipe인 경우 식품안전나라에서 이미지 가져옴.
                : `${urls.baseURL}${recipeDetail.recipe_thumbnail} ` // api_recipe가 아닌 경우 서버에서 이미지 가져옴.
            }
            alt="recipe_thumbnail"
          />
          
          <div>
            ingredient :
            {recipeDetail.recipe_ingredients.map((ingredientObject) => {
              return <span key={ingredientObject.id}>{ingredientObject.ingredients}</span>; // map에는 return이 있어야 한다!
            })}
          </div>

          <span>desc: {recipeDetail.description ? recipeDetail.description : "-"}</span> <br/>

          <span>recipe orders :</span>
          <div>
            {recipeDetail.recipe_order.map((orderObject) => {
              return (
                <div key={orderObject.id}>
                  {recipeDetail.api_recipe 
                    ? (<img src={`${orderObject.recipe_img_api}`} style={{width: "150px"}}/>) 
                    : (<img src={orderObject.recipe_img ? `${urls.baseURL}${orderObject.recipe_img}` : ""} style={{width: "150px"}}/>)
                  }
                  {orderObject.order}{". "}{orderObject.content} {/*content 뒤에 알파벳 붙어나오고(맨 앞 레시피만), 앞에 1. 이런 순서 번호가 붙음.*/}
                </div>
              ); 
            })}
          </div>

        </div>
      ) 
      : ( // recipeDetail에 fetch 된 값이 아직 담기지 않은 경우.
        <Loading />
      )}
    </div>
  );
};

export default RecipeDetail;
