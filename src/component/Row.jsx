import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/recipes/axios";
import urls from "../shared/url";
import "../styles/Row.css";
import star from "../images/star_full.png";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Row = ({ title, id, fetchUrl, option }) => {
  const [recipes, setRecipes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = async () => {
    const request = await axios.get(fetchUrl);
    console.log("fetchRecipeDataRow: ", request.data);
    setRecipes(request.data.serializer_data);
  };

  return (
    <section className="row">
      <h2 className="row_title">
        <Link to={`/recipe?page=1&option=${option}`} className="all-view_btn">
          {title}
        </Link>
      </h2>

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능을 사용할 것인지
        breakpoints={{
          998: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          625: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
        }}
        navigation // arrow 버튼 사용 유무
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
      >
        <div id={id}>
          {recipes !== null &&
            recipes.map((recipe) => (
              <SwiperSlide key={recipe.id}>
                <div className="recipe_content">
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
                  <div className="user-info-container">
                    <span
                      className="recipe_author"
                      onClick={() =>
                        navigate(`/profile/${recipe.user_data.id}`)
                      }
                    >
                      <img
                        src={`${urls.baseURL}${recipe.user_data.user_img}`}
                        className="recipe_author_img"
                      />
                      <p className="recipe_author_nickname">{recipe.author}</p>
                    </span>
                    <span className="recipe_top_span">
                      <p className="recipe_title">{recipe.title}</p>
                      <span className="recipe_star_avg_span">
                        <img src={star} className="recipe_star_img" />
                        <span className="recipe_star_avg">
                          {recipe.star_avg
                            ? parseFloat(recipe.star_avg).toFixed(1)
                            : "-"}
                        </span>
                      </span>
                    </span>
                    <div className="recipe_desc_div">
                      <p className="recipe_desc">
                        {recipe.description
                          ? recipe.description.length > 13
                            ? recipe.description.substr(0, 13) + " ..."
                            : recipe.description
                          : "설명이 없습니다."}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </div>
      </Swiper>
    </section>
  );
};

export default Row;
