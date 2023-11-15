import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/recipes/axios";
import urls from "../shared/url";
import "../styles/Row.css";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Row = ({ title, id, fetchUrl }) => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = async () => {
    const request = await axios.get(fetchUrl);
    console.log("request.data: ", request.data);
    setRecipes(request.data);
  };

  return (
    <section className="row">
      <h2 className="row_title">{title}</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능을 사용할 것인지
        breakpoints={{
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
        navigation // arrow 버튼 사용 유무
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
      >
        <div id={id}>
          {recipes.map((recipe) => (
            <SwiperSlide key={recipe.id}>
              <div className="recipe_content">
                <span className="recipe_top_span">
                  <p className="recipe_title">{recipe.title}</p>
                  <p className="recipe_star_avg">
                    *{" "}
                    {recipe.star_avg
                      ? parseFloat(recipe.star_avg).toFixed(1)
                      : "-"}
                  </p>
                </span>
                <span>
                  <img
                    key={recipe.id}
                    className={`recipe_thumbnail`}
                    src={
                      recipe.api_recipe
                        ? `${recipe.recipe_thumbnail_api}`
                        : `${urls.baseURL}${recipe.recipe_thumbnail}`
                    }
                    alt={recipe.name}
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                  />
                </span>
                <span className="recipe_author">
                  <img
                    src={`${urls.baseURL}${recipe.user_data.user_img}`}
                    className="recipe_author_img"
                  />
                  <p
                    className="recipe_author_nickname"
                    onClick={() => navigate(`/profile/${recipe.user_data.id}`)}
                  >
                    {recipe.author}
                  </p>
                </span>
                <p className="recipe_desc">
                  {recipe.description
                    ? recipe.description.length > 13
                      ? recipe.description.substr(0, 13) + " ..."
                      : recipe.description
                    : "-"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </section>
  );
};

export default Row;
