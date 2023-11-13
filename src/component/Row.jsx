import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/recipes/axios";
import urls from "../shared/url";
import "../styles/Row.css"

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
      <h2>{title}</h2>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} // loop 기능을 사용할 것인지
        breakpoints={{
          // 1378: {
          //   slidesPerView: 6, // 한번에 보이는 슬라이드 개수
          //   slidesPerGroup: 6, // 몇개씩 슬라이드 할지
          // },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        navigation // arrow 버튼 사용 유무
        pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
      >
        <div id={id}>
          {recipes.map((recipe) => (
            <SwiperSlide key={recipe.id}>
              <p>title: {recipe.title}</p>
              <img
                key={recipe.id}
                style={{ padding: "25px 0" }}
                className={`row__poster`}
                src={(recipe.api_recipe) ? `${recipe.recipe_thumbnail_api}` : `${urls.baseURL}${recipe.recipe_thumbnail}`}
                alt={recipe.name}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              />
              <p onClick={() => navigate(`/profile/${recipe.user_data.id}`)}>author: {recipe.author}</p>
              <p>description: {recipe.description ? recipe.description : "-"}</p>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </section>
  );
}

export default Row;