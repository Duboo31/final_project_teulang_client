import React, { useEffect, useState } from "react";
import axios from "../api/recipes/axios";
import "../styles/BookmarksModal.css";
import urls from "../shared/url";
import { useNavigate } from "react-router-dom";

export default function BookmarksModal({
  setModalOpen,
  setRecipeId,
  fetchUrl,
  setIsRecipe1Clicked,
}) {
  const [myBookmarks, setMyBookmarks] = useState([]);
  const navigate = useNavigate();

  const fetchMyBookmarksData = async () => {
    const accesstoken = localStorage.getItem("access");

    const request = await axios.get(fetchUrl, {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    });
    setMyBookmarks(request.data);
  };

  useEffect(() => {
    fetchMyBookmarksData();
  }, []);

  const handleClick = (id) => {
    setRecipeId(id);
    setModalOpen(false);
    setIsRecipe1Clicked(false);
  };

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>

          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__title">내 북마크</span>
            </p>

            {myBookmarks.map((mybookmark) => {
              const created_at = mybookmark.api_recipe
                ? "api recipe"
                : mybookmark.created_at.split("T")[0] +
                  " " +
                  mybookmark.created_at.split("T")[1].substr(0, 5);
              return (
                <div
                  key={mybookmark.id}
                  onClick={() => handleClick(mybookmark.id)}
                  className="search_each_recipe"
                >
                  <div className="search_recipe_content">
                    <div className="search_recipe_left">
                      <div className="search_recipe_title_div">
                        <p
                          className="search_recipe_title"
                          style={{ fontSize: "small" }}
                        >
                          {mybookmark.title.length > 13
                            ? mybookmark.title.substr(0, 13) + " ..."
                            : mybookmark.title}
                        </p>
                      </div>
                      <div className="search_recipe_desc_div">
                        <p className="search_recipe_desc">
                          {mybookmark.description
                            ? mybookmark.description.length > 55
                              ? mybookmark.description.substr(0, 55) +
                                " ... 더보기"
                              : mybookmark.description
                            : "-"}
                        </p>
                      </div>
                      <div className="search_recipe_left_footer">
                        <span className="search_recipe_star_avg">
                          별점:{" "}
                          {mybookmark.star_avg ? mybookmark.star_avg : "-"}
                        </span>
                        <span className="search_recipe_bookmark_count">
                          북마크: {mybookmark.bookmark_count}
                        </span>
                      </div>
                    </div>
                    <img
                      src={
                        mybookmark.api_recipe
                          ? mybookmark.recipe_thumbnail_api
                          : `${urls.baseURL}${mybookmark.recipe_thumbnail}`
                      }
                      alt="recipe"
                      className="search_recipe_thumbnail"
                    />
                  </div>

                  <div className="search_recipe_footer">
                    <div className="search_recipe_author" onClick={() => {navigate(`/profile/${mybookmark.user_data.id}`)}}>
                      <img
                        src={`${urls.baseURL}${mybookmark.user_data.user_img}`}
                        alt="user_img"
                        className="search_recipe_author_img"
                      />
                      <span className="search_recipe_author_nickname">
                        {mybookmark.author}
                      </span>
                    </div>
                    <span className="search_recipe_created_at">
                      {created_at}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
