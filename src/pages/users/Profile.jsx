import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPorfile } from "../../api/user/GET/profile";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

// css
import "../../styles/user/profile.css";
import "../../styles/recipe/recipe.css";

const Profile = () => {
  // 프로필 페이지에서 현재 로그인 유저와 페이지의 유저가 같은 유저인지 확인
  const [isMyAccount, setIsMyAccount] = useState(false);
  const [isBookmarkActive, setIsBookmarkActive] = useState(false);

  // 리덕스 스토어의 현재 계정 정보
  const user = useSelector(({ users }) => {
    return users;
  });

  const navigate = useNavigate();

  // url에서 가져온 계정 번호
  const { userId } = useParams();

  useEffect(() => {
    setIsMyAccount(user.userId === Number(userId));
  }, [userId, user]);

  const { data, isSuccess } = useQuery(["user", userId], () =>
    getPorfile(userId)
  );

  const onClickProfileUpdateBtnHandler = () => {
    navigate(`/profile/userModify/`);
  };

  console.log("data: ", data);

  return (
    <div>
      <div>
        {isSuccess && (
          <div className="profile-wrap">
            <div className="profile_picture-container">
              <img
                src={`${process.env.REACT_APP_SERVER_LOCAL_URL}${data?.data?.user_img}`}
                alt="프로필 이미지"
              />
            </div>
            <div>
              <div className="profile-side profile-side_fst">
                <div>{data?.data?.nickname}</div>
                {isMyAccount && (
                  <div>
                    <button onClick={onClickProfileUpdateBtnHandler}>
                      편집
                    </button>
                  </div>
                )}
              </div>
              <div className="profile-side profile-side_sec">
                <div>
                  팔로워 <span>0</span>
                </div>
                <div>
                  팔로잉 <span>0</span>
                </div>
              </div>
              <div>
                레시피 <span>{data.data.articles_recipe.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <ul className="select-tab">
        <li
          onClick={() => {
            setIsBookmarkActive(false);
          }}
          className={isBookmarkActive ? "" : "active"}
        >
          내 레시피
        </li>
        <li
          onClick={() => {
            setIsBookmarkActive(true);
          }}
          className={isBookmarkActive ? "active" : ""}
        >
          북마크 레시피
        </li>
      </ul>
      <div>
        {!isBookmarkActive ? (
          <ul className="recipes-wrap">
            {isSuccess &&
              data.data.articles_recipe.map((recipe) => {
                return (
                  <li key={recipe.id}>
                    <div>
                      <img
                        src={`${process.env.REACT_APP_SERVER_LOCAL_URL}${recipe.recipe_thumbnail}`}
                        alt="레시피 썸네일"
                      />
                    </div>
                    <div className="recipe-detail">
                      <div>{recipe.title}</div>
                      <div>{recipe.description}</div>
                    </div>
                  </li>
                );
              })}
          </ul>
        ) : (
          <ul className="recipes-wrap">
            {isSuccess &&
              data.data.bookmarked_articles.map((recipe) => {
                return (
                  <li key={recipe.id}>
                    <div
                      onClick={() => {
                        navigate(`/profile/${recipe.article_recipe.author}`);
                      }}
                    >
                      <img
                        src={`${process.env.REACT_APP_SERVER_LOCAL_URL}${recipe.article_recipe.recipe_thumbnail}`}
                        alt="레시피 썸네일"
                      />
                    </div>
                    <div className="recipe-detail">
                      <div>{recipe.article_recipe.title}</div>
                      <div>{recipe.article_recipe.description}</div>
                      <div
                        onClick={() => {
                          navigate(`/profile/${recipe.article_recipe.author}`);
                        }}
                      >
                        {recipe.author_nickname}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
