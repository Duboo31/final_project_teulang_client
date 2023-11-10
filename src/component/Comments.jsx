import React from "react";

export default function Comments({ recipeComments }) {
  const renderRecipeComments = () => {
    if (recipeComments) {
        return recipeComments.length > 0 ? ( // 댓글이 있는 경우
          <section>
            {recipeComments.map((comment, index) => {
                return (
                    <div key={index}>
                        comment{index+1}. {comment.content}
                    </div>
                )
            })}
          </section>
        ) : ( // 댓글이 없는 경우
          <section>no comments</section>
        );
    } else {
        return ( // 아직 recipeComments에 data가 fetch되지 않은 경우
            <section>
                not fetched yet
            </section>
        )
    }
  };

  return renderRecipeComments();
}
