import axios from "../api/recipes/axios";
import React, { useEffect, useState } from "react";
import tokens from "../api/recipes/token";
import urls from "../shared/url";

export default function Comments({ recipeComments, recipeId }) {
  const [commentContent, setCommentContent] = useState("");
  const [commentUpdateContent, setCommentUpdateContent] = useState("");
  const [comments, setComments] = useState(recipeComments);

  useEffect(() => {
    setComments(recipeComments); // 처음에 새로고침하면 recipeComments가 undefined로 들어와서, 값이 들어왔을 때 comments에 넣고 화면에 띄우기 위해서 필요.
    console.log(recipeComments);
  }, [recipeComments]);

  const renderRecipeComments = () => {
    if (recipeComments) {
      return recipeComments.length > 0 ? (
        // 댓글이 있는 경우
        <section>
          {recipeComments.map((comment, index) => {
            return (
              <div key={index}>
                comment{index + 1}. {comment.content}
              </div>
            );
          })}
        </section>
      ) : (
        // 댓글이 없는 경우
        <section>no comments</section>
      );
    } else {
      return (
        // 아직 recipeComments에 data가 fetch되지 않은 경우
        <section>not fetched yet</section>
      );
    }
  };

  const handleCreateInputChange = (e) => {
    // 꼭 인풋에 작성할 때마다 이렇게 state 사용해서 state에 값을 저장해줘야 하나? input에 들어간 value를 한 번에 post로 넘길 순없나?
    setCommentContent(e.target.value);
  };

  const handleCreateComment = async () => {
    await axios
      .post(
        `/articles/recipe/${recipeId}/comment/`,
        {
          content: commentContent,
          article_recipe: recipeId,
        },
        {
          headers: {
            Authorization: `Bearer ${tokens.accesstoken}`,
          },
        }
      )
      .then(function (response) {
        console.log("reponse.data ", response.data); // response로 추가된 데이터를 보내달라고 해서 그걸 아래서 바로 setComments로 comments에 할당해야하나?
        // setComments(recipeComments); -> 이렇게 하면 안 됨!!
        console.log("prevComments", comments);
        setComments((prevComments) => [...prevComments, response.data]); // comments 값을 바꿔서 아래 추가된 코멘트가 렌더링되게끔.
        // 이렇게 하기 위해서 원래 response로 오던 "댓글이 작성되었습니다"를 새로 작성된 데이터로 바꿨는데 이렇게 하는게 맞나?

        // 생성 인풋 값 지우기
        const createInput = document.getElementById("comment_create_input");
        createInput.value = "";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleUpdateInputChange = (e) => {
    setCommentUpdateContent(e.target.value);
  };

  const handleUpdateComment = async (updateCommentId, prevCommentContent) => {
    // console.log(updateCommentId);

    const updateBtn = document.getElementById(
      `comment_update_btn${updateCommentId}`
    );
    const updateInput = document.getElementById(
      `comment_update_input${updateCommentId}`
    );
    // 아래서 update btn / updateinput에 특정 id값 안 넣어주니까 아래에서 수정 버튼 눌러도 무조건 맨 위에 버튼이나 input이 지정되었음.
    // 그랬더니 수정도 맨 위에거만 됨. 왜 그랬는지.. 아래 findindex 로직을 더 깊게 이해해봐야할 듯.
    // updateCommentId는 그때도 클릭한 댓글의 id로 잘 지정되었는데!

    if (updateBtn.textContent === "수정하기") {
      updateInput.style.display = "block";
      updateInput.value = prevCommentContent;
      updateBtn.textContent = "수정";
    } else {
      await axios
        .put(
          `/articles/recipe/${recipeId}/comment/${updateCommentId}/`,
          {
            content: commentUpdateContent,
            article_recipe: recipeId,
          },
          {
            headers: {
              Authorization: `Bearer ${tokens.accesstoken}`,
            },
          }
        )
        .then(function (response) {
          console.log("data ", response.data);
          let findIndex = comments.findIndex(
            (comment) => comment.id === updateCommentId
          );
          let copiedComments = [...comments];
          copiedComments[findIndex] = response.data;
          setComments(copiedComments);

          updateInput.style.display = "none";
          updateBtn.textContent = "수정하기";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleDeleteComment = async (deleteCommentId) => {
    await axios
      .delete(`/articles/recipe/${recipeId}/comment/${deleteCommentId}/`, {
        headers: {
          Authorization: `Bearer ${tokens.accesstoken}`,
        },
      })
      .then(function (response) {
        console.log("data ", response.data);
        let findIndex = comments.findIndex(
          (comment) => comment.id === deleteCommentId
        );
        let copiedComments = [...comments];
        copiedComments[findIndex] = response.data;
        setComments(copiedComments);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <section>
      <div>
        <input onChange={handleCreateInputChange} id="comment_create_input"/>
        <button onClick={handleCreateComment}>create</button>
      </div>

      {/* 댓글 보여주기 */}
      {comments !== undefined ? (
        <div>
          {comments.map((comment, index) => {
            if (comment.id) {
              // 이걸 안 하면 삭제했을 때 저 comment.id랑 comment.content 등만 사라지고 기존에 그냥 comment 이런 글자나 div는 남음.
              return (
                <div key={comment.id} style={{border: "1px solid"}}>
                    <img src={`${urls.baseURL}${comment.user_data.user_img}`} style={{width: "30px"}}/> {/* 백에서 user_defalt.jpg 로 되어있음. user_default.jpg로 수정 필요 */}
                    author: {comment.user_data.nickname} <br/>
                  comment{index}: {comment.content}{" "}
                  <input
                    onChange={handleUpdateInputChange}
                    id={`comment_update_input${comment.id}`}
                    style={{ display: "none" }}
                  />
                  <button
                    onClick={() => handleUpdateComment(comment.id, comment.content)}
                    id={`comment_update_btn${comment.id}`}
                  >
                    수정하기
                  </button>
                  {/* comment에 작성한 유저의 아이디 등 유저 정보 필요 */}
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    id={`comment_delete_btn${comment.id}`}
                  >
                    삭제
                  </button>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div>
          {/* 아직 recipeComments에 data가 fetch되지 않은 경우 */}
          <p>not fetched yet</p>
        </div>
      )}
    </section>
  );
}
