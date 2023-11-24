import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/recipes/axios";
import urls from "../shared/url";
import "../styles/Row.css";
import star from "../images/star_full.png";
import default_thumbnail from "../images/default_thumbnail.jpg"

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ArticleRow = ({ title, id, fetchUrl }) => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticleData();
  }, []);

  const fetchArticleData = async () => {
    const request = await axios.get(fetchUrl);
    console.log("fetchArticleDataRow: ", request.data.serializer_data);
    setArticles(request.data.serializer_data);
  };

  return (
    <section className="row">
      <h2 className="row_title">{title}</h2>
      <Link to={`/article`}>전체 보기</Link>
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
          {articles.map((article) => (
            <SwiperSlide key={article.id}>
              <div className="recipe_content">
                <span className="recipe_top_span">
                  <p className="recipe_title">{article.title}</p>
                  {/* <span className="recipe_star_avg_span">
                    <img src={star} className="recipe_star_img" />
                    <span className="recipe_star_avg">
                      {recipe.star_avg
                        ? parseFloat(recipe.star_avg).toFixed(1)
                        : "-"}
                    </span>
                  </span> */}
                </span>
                <span>
                  <img
                    key={article.id}
                    className={`recipe_thumbnail`}
                    src={
                        article.images
                        ? `${urls.baseURL}${article.images[0].free_image}`
                        : default_thumbnail
                    }
                    onClick={() => navigate(`/article/${article.id}`)}
                  />
                </span>
                <span
                  className="recipe_author"
                  onClick={() => navigate(`/profile/${article.user_data.id}`)}
                >
                  <img
                    src={`${urls.baseURL}${article.user_data.user_img}`}
                    className="recipe_author_img"
                  />
                  <p className="recipe_author_nickname">{article.user_data.nickname}</p>
                </span>
                <div className="recipe_desc_div">
                  <p className="recipe_desc">
                    {article.content
                      ? article.content.length > 13
                        ? article.content.substr(0, 13) + " ..."
                        : article.content
                      : "-"}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </section>
  );
};

export default ArticleRow;
