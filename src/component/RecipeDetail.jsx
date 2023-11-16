import React, { useEffect, useState } from "react";
import urls from "../shared/url";
import axios from "../api/recipes/axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import bookmarked_icon from "../images/bookmarked.png";
import not_bookmarked_icon from "../images/not_bookmarked.png";

import "../styles/RecipeDetail.css";

const RecipeDetail = ({ recipeDetail }) => {
  const navigate = useNavigate();
  const [starAvg, setStarAvg] = useState(recipeDetail.star_avg);

  useEffect(() => {
    console.log(recipeDetail);
    setStarAvg(recipeDetail.star_avg);
  }, [recipeDetail]);

  // 로그인 된 유저 정보
  const user = useSelector(({ users }) => {
    return users;
  });

  const handleDeleteRecipe = async () => {
    const accessToken = localStorage.getItem("access");

    await axios
      .delete(`/articles/recipe/${recipeDetail.id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        console.log("reponse.data ", response.data);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUpdateRecipe = () => {
    navigate("/update", { state: { recipeDetail } });
  };

  const handleSubmitStarRate = async () => {
    const accessToken = localStorage.getItem("access");

    await axios
      .post(
        `/articles/recipe/${recipeDetail.id}/star_rate/`,
        {
          star_rate: document.getElementById("user_star_rate").value,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("reponse.data ", response.data);
        setStarAvg(response.data.star_avg);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleBookmark = async (e) => {
    const accessToken = localStorage.getItem("access");
    const bookmark = document.getElementById("bookmark");
    console.log(e.target.src === bookmarked_icon);

    if (e.target.src === bookmarked_icon) {
      bookmark.src = not_bookmarked_icon;
    } else {
      bookmark.src = bookmarked_icon;
    }
    await axios
      .post(
        `/articles/recipe/${recipeDetail.id}/bookmark/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("reponse.data ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="recipe_detail">
      {recipeDetail.id !== undefined ? (
        // recipeDetail에 fetch 된 값이 담긴 경우.
        <div>
          <span className="detail_header">
            <p className="detail_title">{recipeDetail.title}</p>
            <div className="detail_header_rignt">
              <p className="detail_star_avg">
                평균 별점 :{" "}
                {starAvg
                  ? parseFloat(recipeDetail.star_avg).toFixed(1)
                  : "-"}
              </p>
              {!(user.userId === recipeDetail.user_data.id) && (
                <img
                  src={bookmarked_icon}
                  id="bookmark"
                  onClick={handleBookmark}
                  className="detail_bookmark"
                />
              )}
            </div>
          </span>
          <img
            src={
              recipeDetail.api_recipe
                ? `${recipeDetail.recipe_thumbnail_api} ` // api_recipe인 경우 식품안전나라에서 이미지 가져옴.
                : `${urls.baseURL}${recipeDetail.recipe_thumbnail} ` // api_recipe가 아닌 경우 서버에서 이미지 가져옴.
            }
            className="detail_recipe_thumbnail"
            alt="detail_recipe_thumbnail"
          />
          <div className="detail_footer">
            <div
              className="detail_author"
              onClick={() => {
                navigate(`/profile/${recipeDetail.user_data.id}`);
              }}
            >
              <img
                src={`${urls.baseURL}${recipeDetail.user_data.user_img}`}
                className="detail_author_img"
              />
              <div className="detail_author_right">
                <p className="detail_author_nickname">{recipeDetail.author}</p>
                <p className="detail_created_at">
                  {recipeDetail.created_at.split("T")[0] +
                    " " +
                    recipeDetail.created_at.split("T")[1].substr(0, 5)}
                </p>
              </div>
            </div>
            <div>
              {!(user.userId === recipeDetail.user_data.id) ? (
                <div>
                  <span>star : </span>
                  {/* <input value={starRate} /> */}
                  <select id="user_star_rate" className="user_star_rate_select">
                    <option value={5}>5</option>
                    <option value={4}>4</option>
                    <option value={3}>3</option>
                    <option value={2}>2</option>
                    <option value={1}>1</option>
                  </select>
                  <button
                    onClick={handleSubmitStarRate}
                    className="detail_CU_btn"
                  >
                    제출
                  </button>
                  {/* <button onClick={handleBookmark} id="bookmark_btn">
                    북마크 안 됨
                  </button> */}
                </div>
              ) : (
                <div>
                  {user.userId === recipeDetail.user_data.id && (
                    <button
                      onClick={handleUpdateRecipe}
                      className="detail_CU_btn"
                    >
                      수정
                    </button>
                  )}
                  {user.userId === recipeDetail.user_data.id && (
                    <button
                      onClick={handleDeleteRecipe}
                      className="detail_CU_btn"
                    >
                      삭제
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="detail_sections_div">
            <p className="detail_sections_title">재료 :</p>
            <div className="detail_all_ingredients">
              {recipeDetail.recipe_ingredients.map((ingredientObject) => {
                return (
                  <span
                    key={ingredientObject.id}
                    className="detail_each_ingredient"
                  >
                    {ingredientObject.ingredients}
                  </span>
                ); // map에는 return이 있어야 한다!
              })}
            </div>
          </div>
          <div className="detail_sections_div">
            <p className="detail_sections_title">설명 : </p>
            <span className="detail_description">
              {recipeDetail.description ? recipeDetail.description : "-"}
            </span>
          </div>
          <div className="detail_sections_div">
            <p className="detail_sections_title">요리 순서 :</p>
            <div className="detail_all_recipe_orders">
              {recipeDetail.recipe_order.map((orderObject) => {
                return (
                  <div
                    key={orderObject.id}
                    className="detail_each_recipe_order"
                  >
                    <span className="detail_recipe_orders">
                      <span className="detail_recipe_orders_order">
                        {orderObject.order}
                      </span>
                      <span className="detail_recipe_orders_content">
                        {orderObject.content}
                      </span>
                    </span>
                    {recipeDetail.api_recipe
                      ? orderObject.recipe_img_api && (
                          <img
                            src={`${orderObject.recipe_img_api}`}
                            className="detail_recipe_order_img"
                          />
                        )
                      : orderObject.recipe_img && (
                          <img
                            src={
                              orderObject.recipe_img
                                ? `${urls.baseURL}${orderObject.recipe_img}`
                                : ""
                            }
                            className="detail_recipe_order_img"
                          />
                        )}

                    {/*content 뒤에 알파벳 붙어나오고(맨 앞 레시피만), 앞에 1. 이런 순서 번호가 붙음.*/}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        // recipeDetail에 fetch 된 값이 아직 담기지 않은 경우.
        <Loading />
      )}
    </div>
  );
};

export default RecipeDetail;
