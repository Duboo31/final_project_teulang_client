import axios from "../api/recipes/axios";
import React from "react";
import tokens from "../api/recipes/token";

export default function Bookmark({ recipeId }) {
  const handleBookmark = async () => {
    const accessToken = localStorage.getItem("access");
    const bookmarkBtn = document.getElementById("bookmark_btn");

    if (bookmarkBtn.textContent === "북마크 안 됨") {
      bookmarkBtn.textContent = "북마크 됨";
    } else {
      bookmarkBtn.textContent = "북마크 안 됨";
    }
    await axios
        .post(`/articles/recipe/${recipeId}/bookmark/`, {},{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(function (response) {
          console.log("reponse.data ", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  return (
    <div>
      <button onClick={handleBookmark} id="bookmark_btn">
        북마크 안 됨
      </button>
    </div>
  );
}
