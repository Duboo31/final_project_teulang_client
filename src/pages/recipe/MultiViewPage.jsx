import React, { useState } from "react";

// components
import RecipeDetailForm from "../../component/RecipeDetailForm";
import BookmarksModal from "../../component/BookmarksModal";
import requests from "../../api/recipes/requests";

export default function MultiViewPage() {
  // 페이지는 rfc로, 컴포넌트는 rafc?로 하는 이유가?
  const [recipeId1, setRecipeId1] = useState(0);
  const [recipeId2, setRecipeId2] = useState(0);
  const [isLeftClicked, setIsRecipe1Clicked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = (e) => {
    console.log(e.target.name);
    if (e.target.name === "btn_left") {
      setIsRecipe1Clicked(true);
    }
    setModalOpen(true);
  };

  return (
    <div style={{ height: "75vh"}}>
      <div
        style={{
          height: "100%",
          width: "50%",
          float: "left",
          border: "1px solid lightgray",
          boxSizing: "border-box",
          padding: "1rem",
          backgroundColor: "lightgray",
          backgroundClip: "content-box",
        }}
      >
        <div style={{ height: "100%", overflow: "scroll" }}>
          <button onClick={handleClick} name="btn_left">
            my bookmarks
          </button>
          <div>
            {recipeId1 ? (
              <RecipeDetailForm recipeId={recipeId1} />
            ) : (
              <div>none</div>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          height: "100%",
          width: "50%",
          float: "right",
          border: "1px solid lightgray",
          boxSizing: "border-box",
          padding: "1rem",
          backgroundColor: "lightgray",
          backgroundClip: "content-box",
          overflow: "scroll",
        }}
      >
        <div style={{ height: "100%", overflow: "scroll" }}>
          <button onClick={handleClick} name="btn_right">
            my bookmarks
          </button>
          <div>
            {recipeId2 ? (
              <RecipeDetailForm recipeId={recipeId2} />
            ) : (
              <div>none</div>
            )}
          </div>
        </div>
      </div>

      {modalOpen && (
        <BookmarksModal
          setModalOpen={setModalOpen}
          setRecipeId={isLeftClicked ? setRecipeId1 : setRecipeId2}
          fetchUrl={requests.fetchMyPageData}
          setIsRecipe1Clicked={setIsRecipe1Clicked}
        />
      )}
    </div>
  );
}
