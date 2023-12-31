import axios from "../api/recipes/axios";
import React, { useEffect, useState } from "react";
import urls from "../shared/url";
import Loading from "./Loading";
import "../styles/Comments.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Comments({ recipeComments, recipeId, fetchUrl }) {
  const [commentContent, setCommentContent] = useState("");
  const [commentUpdateContent, setCommentUpdateContent] = useState("");
  const [comments, setComments] = useState(recipeComments);
  const navigate = useNavigate();

  useEffect(() => {
    setComments(recipeComments); // 처음에 새로고침하면 recipeComments가 undefined로 들어와서, 값이 들어왔을 때 comments에 넣고 화면에 띄우기 위해서 필요.
    // console.log("recipeComments", recipeComments);
  }, [recipeComments]);

  const user = useSelector(({ users }) => {
    return users;
  });

  // handle create comment
  const handleCreateInputChange = (e) => {
    // 꼭 인풋에 작성할 때마다 이렇게 state 사용해서 state에 값을 저장해줘야 하나? input에 들어간 value를 한 번에 post로 넘길 순없나?
    setCommentContent(e.target.value);
  };

  const handleCreateComment = async () => {
    const accessToken = localStorage.getItem("access");

    await axios
      .post(
        fetchUrl,
        {
          content: commentContent,
          article_recipe: recipeId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        // console.log("reponse.data ", response.data); // response로 추가된 데이터를 보내달라고 해서 그걸 아래서 바로 setComments로 comments에 할당해야하나?
        // setComments(recipeComments); -> 이렇게 하면 안 됨!!
        setComments((prevComments) => [...prevComments, response.data]); // comments 값을 바꿔서 아래 추가된 코멘트가 렌더링되게끔.

        // 생성 인풋 값 지우기
        const createInput = document.getElementById(
          `comment_create_input${recipeId}`
        );
        createInput.value = "";
        setCommentContent("");
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 401) {
          alert("인증되지 않은 사용자입니다. 로그인 해주세요.");
        }
        if (error.response.status === 403) {
          alert("인증되지 않은 사용자입니다. 이메일 인증을 진행하세요.");
        }
      });
  };

  // handle update comment
  const handleUpdateInputChange = (e) => {
    setCommentUpdateContent(e.target.value);
  };

  const handleUpdateComment = async (updateCommentId, prevCommentContent) => {
    const updateBtn = document.getElementById(
      `comment_update_btn${updateCommentId}`
    );
    const updateInput = document.getElementById(
      `comment_update_input${updateCommentId}`
    );
    const prevContentSpan = document.getElementById(
      `comments_content${updateCommentId}`
    );
    // 아래서 update btn / updateinput에 특정 id값 안 넣어주니까 아래에서 수정 버튼 눌러도 무조건 맨 위에 버튼이나 input이 지정되었음.
    // 그랬더니 수정도 맨 위에거만 됨. 왜 그랬는지.. 아래 findindex 로직을 더 깊게 이해해봐야할 듯.
    // updateCommentId는 그때도 클릭한 댓글의 id로 잘 지정되었는데!

    const accessToken = localStorage.getItem("access");

    if (updateBtn.textContent === "수정") {
      // console.log(prevContentSpan);
      updateInput.style.display = "block";
      prevContentSpan.style.display = "none";
      updateInput.value = prevCommentContent;
      updateBtn.textContent = "저장";
    } else {
      await axios
        .put(
          `${fetchUrl}${updateCommentId}/`,
          {
            content: updateInput.value,
            article_recipe: recipeId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(function (response) {
          // console.log("data ", response.data);
          let findIndex = comments.findIndex(
            (comment) => comment.id === updateCommentId
          );
          let copiedComments = [...comments];
          copiedComments[findIndex] = response.data;
          setComments(copiedComments);

          updateInput.style.display = "none";
          prevContentSpan.style.display = "block";
          updateBtn.textContent = "수정";
        })
        .catch(function (error) {
          console.log(error);
          if (error.response.status === 401) {
            alert("인증되지 않은 사용자입니다. 로그인 해주세요.");
          }
        });
    }
  };

  // handle delete comment
  const handleDeleteComment = async (deleteCommentId) => {
    var result = window.confirm("댓글을 삭제하시겠습니까?");

    if (result == true) {
      const accessToken = localStorage.getItem("access");

      await axios
        .delete(`${fetchUrl}${deleteCommentId}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(function (response) {
          // console.log("data ", response.data);
          let findIndex = comments.findIndex(
            (comment) => comment.id === deleteCommentId
          );
          let copiedComments = [...comments];
          copiedComments[findIndex] = response.data;
          setComments(copiedComments);
        })
        .catch(function (error) {
          console.log(error.response);
          if (error.response.status === 401) {
            alert("인증되지 않은 사용자입니다. 로그인 해주세요.");
          }
        });
    }
  };

  return (
    <section className="comments_whole">
      <section className="comments">
        <p className="comments_create_title"></p>
        <div className="comments_create_div">
          <div className="comments_create">
            <textarea
              placeholder="댓글을 입력하세요."
              onChange={handleCreateInputChange}
              id={`comment_create_input${recipeId}`}
              className="comments_create_input"
            />
          </div>
          <button onClick={handleCreateComment} className="comments_create_btn">
            댓글 등록
          </button>
        </div>

        {/* 댓글 보여주기 */}
        {comments !== undefined ? (
          <div className="comments_all_div">
            {comments.map((comment, index) => {
              if (comment.id) {
                // 이걸 안 하면 삭제했을 때 저 comment.id랑 comment.content 등만 사라지고 기존에 그냥 comment 이런 글자나 div는 남음.
                return (
                  <div key={comment.id} className="comments_each_div">
                    <div className="comments_header">
                      <div
                        className="comments_author"
                        onClick={() => {
                          navigate(`/profile/${comment.user_data.id}`);
                        }}
                      >
                        <img
                          src={`${urls.baseURL}${comment.user_data.user_img}`}
                          className="comments_author_img"
                        />{" "}
                        {/* 백에서 user_defalt.jpg 로 되어있음. user_default.jpg로 수정 필요 */}
                        <span className="comments_author_nickname">
                          {comment.user_data.nickname}
                        </span>
                      </div>
                      {user.userId === comment.user_data.id && (
                        <div className="comments_UD_btns">
                          <button
                            onClick={() =>
                              handleUpdateComment(comment.id, comment.content)
                            }
                            id={`comment_update_btn${comment.id}`}
                            className="comments_update_btn"
                          >
                            수정
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            id={`comment_delete_btn${comment.id}`}
                            className="comments_delete_btn"
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="comments_content_div">
                      <div
                        id={`comments_content${comment.id}`}
                        className="comments_content"
                      >
                        {comment.content}
                      </div>
                      <textarea
                        onChange={handleUpdateInputChange}
                        id={`comment_update_input${comment.id}`}
                        style={{ display: "none" }}
                        className="comments_update_input"
                      />
                    </div>

                    <div className="comments_footer">
                      <span className="comments_create_at">
                        {comment.created_at.split("T")[0] +
                          " " +
                          comment.created_at.split("T")[1].substr(0, 5)}
                      </span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <div>
            {/* 아직 recipeComments에 data가 fetch되지 않은 경우 */}
            <Loading />
          </div>
        )}
      </section>
    </section>
  );
}
