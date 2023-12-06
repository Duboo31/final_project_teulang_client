import React, { useState } from "react";
import { useSelector } from "react-redux";

// components
import RecipeDetailForm from "../../component/RecipeDetailForm";
import BookmarksModal from "../../component/BookmarksModal";

import "../../styles/MultiViewPage.css";

export default function MultiViewPage() {
  // 페이지는 rfc로, 컴포넌트는 rafc?로 하는 이유가?
  const [recipeId1, setRecipeId1] = useState(0);
  const [recipeId2, setRecipeId2] = useState(0);
  const [isLeftClicked, setIsRecipe1Clicked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // 로그인 된 유저 정보
  const user = useSelector(({ users }) => {
    return users;
  });

  const handleClick = (e) => {
    // console.log(e.target.name);
    if (e.target.name === "btn_left") {
      setIsRecipe1Clicked(true);
    }
    setModalOpen(true);
  };

  return (
    <div className="multi_whole">
      <div className="multi_sec1">
        <div className="multi_sec1_div">
          <div className="multi_header">
            <span className="multi_header_span">
              내가 북마크한 게시글 불러오기
            </span>
            <button
              onClick={handleClick}
              name="btn_left"
              className="multi_sec_btn"
            >
              +
            </button>
          </div>
          <div className="multi_detail_form">
            {recipeId1 ? (
              <RecipeDetailForm recipeId={recipeId1} />
            ) : (
              <div className="multi_detail_none"></div>
            )}
          </div>
        </div>
      </div>
      <div className="multi_sec2">
        <div className="multi_sec2_div">
          <div className="multi_header">
            <span className="multi_header_span">
              내가 북마크한 게시글 불러오기
            </span>
            <button
              onClick={handleClick}
              name="btn_right"
              className="multi_sec_btn"
            >
              +
            </button>
          </div>
          <div className="multi_detail_form">
            {recipeId2 ? (
              <RecipeDetailForm recipeId={recipeId2} />
            ) : (
              <div className="multi_detail_none"></div>
            )}
          </div>
        </div>
      </div>

      <div className="bookmarks_modal_component">
        {modalOpen && user.userId && (
          <BookmarksModal
            setModalOpen={setModalOpen}
            setRecipeId={isLeftClicked ? setRecipeId1 : setRecipeId2}
            fetchUrl={`articles/recipe/bookmark/`}
            setIsRecipe1Clicked={setIsRecipe1Clicked}
          />
        )}
      </div>
    </div>
  );
}
