import axios from "../../api/recipes/axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import requests from "../../api/recipes/requests";
import Loading from "../../component/Loading";
import urls from "../../shared/url";
import default_thumbnail from "../../images/default_thumbnail.jpg";
import Comments from "../../component/Comments";
import { useSelector } from "react-redux";
import "../../styles/FreeDetailPage.css";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function FreeDetailPage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [freeArticleDetail, setFreeArticleDetail] = useState([]);
  const [freeArticleComments, setFreeArticleComments] = useState([]);

  // 로그인 된 유저 정보
  const user = useSelector(({ users }) => {
    return users;
  });

  useEffect(() => {
    fetchFreeArticleDetail();
  }, []);

  const fetchFreeArticleDetail = async () => {
    const request = await axios.get(requests.fetchFreeList + `${articleId}/`);
    // console.log("freeArticleDetail: ", request.data);
    setFreeArticleDetail(request.data);
    setFreeArticleComments(request.data.article_free_comment);
  };

  const handleUpdateArticle = () => {
    navigate("/article/update", { state: { freeArticleDetail } });
  };

  const handleDeleteArticle = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      const accessToken = localStorage.getItem("access");

      await axios
        .delete(`/articles/free/${freeArticleDetail.id}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(function (response) {
          // console.log("reponse.data ", response.data);
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div>
      {freeArticleDetail.id ? (
        <div className="free_detail_whole">
          <div className="free_detail_header">
            <p className="free_detail_header_title">
              {freeArticleDetail.title}
            </p>
          </div>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            loop={true} // loop 기능을 사용할 것인지
            breakpoints={{
              0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
            }}
            navigation // arrow 버튼 사용 유무
            pagination={{ clickable: true }} // 페이지 버튼 보이게 할지
          >
            {freeArticleDetail.images ? (
              freeArticleDetail.images.map((image) => {
                return (
                  <SwiperSlide key={image.id}>
                    <div key={image.id} className="free_detail_img_div">
                      <img
                        src={urls.baseURL + image.free_image}
                        style={{ width: "200px" }}
                        className="free_detail_img"
                      />
                    </div>
                  </SwiperSlide>
                );
              })
            ) : (
              <div className="free_detail_img_div">
                <img src={default_thumbnail} />
              </div>
            )}
          </Swiper>
          <div className="free_detail_footer">
            <div className="free_detail_author" onClick={() => navigate(`/profile/${freeArticleDetail.user_data.id}`)}>
              <img src={urls.baseURL+freeArticleDetail.user_data.user_img} className="free_detail_author_img"/>
              <div className="free_detail_author_right">
                <p className="free_detail_author_nickname">{freeArticleDetail.user_data.nickname}</p>
                <p className="free_detail_created_at">
                  {freeArticleDetail.created_at.split("T")[0] +
                    " " +
                    freeArticleDetail.created_at.split("T")[1].substr(0, 5)}
                </p>
              </div>
            </div>
            {user.userId === freeArticleDetail.user_data.id && (
              <div>
                <button onClick={handleUpdateArticle} className="detail_CU_btn">
                  수정
                </button>
                <button onClick={handleDeleteArticle} className="detail_CU_btn">
                  삭제
                </button>
              </div>
            )}
          </div>
          <div className="free_detail_desc_div">
            <span className="free_detail_desc">
              {freeArticleDetail.content ? freeArticleDetail.content : "내용이 없습니다."}
            </span>
          </div>
          {/* <span>content: {freeArticleDetail.content}</span> <br /> */}
          <div>
            <Comments
              recipeComments={freeArticleComments}
              recipeId={articleId}
              fetchUrl={`/articles/free/${articleId}/comment/`}
            />
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
}
