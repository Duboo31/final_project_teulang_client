import React, { useEffect, useState } from 'react';
import axios from "../api/recipes/axios";
import "../style/BookmarksModal.css";

export default function BookmarksModal({setModalOpen, setRecipeId, fetchUrl, setIsRecipe1Clicked}) {
    const [myBookmarks, setMyBookmarks] = useState([]);

    const fetchMyBookmarksData = async () => {
        const request = await axios.get(fetchUrl);
        console.log("request.data: ", request.data.bookmarked_articles);
        setMyBookmarks(request.data.bookmarked_articles);
      }

    useEffect(() => {
        fetchMyBookmarksData();
    },[]);

    const handleClick = (e) => {
        // console.log(e.target.id);
        setRecipeId(e.target.id);
        setModalOpen(false);
        setIsRecipe1Clicked(false);
    }

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span onClick={() => setModalOpen(false)} className="modal-close">
            X
          </span>

          {/* <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal__poster-img"
          /> */}

          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user_perc">100% for you</span>{" "}
              hihi
            </p>

            <h2 className="modal__title">title</h2>
            <p className="modal__overview"> 평점: </p>
            <p className="modal__overview"> overview</p>

            {myBookmarks.map((mybookmark) => {
            console.log(mybookmark.article_recipe_id)
            return (
                <div key={mybookmark.article_recipe_id}>
                    <p onClick={handleClick} id={mybookmark.article_recipe_id}>{mybookmark.article_recipe_id}</p>
                </div>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  )
}
