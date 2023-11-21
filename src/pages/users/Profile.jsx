import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueries } from "react-query";
import { useSelector } from "react-redux";

// api
import { getPorfile } from "../../api/user/GET/profile";
import { postFollow } from "../../api/user/POST/follow";
// css
import "../../styles/user/profile.css";
import "../../styles/recipe/recipe.css";

const Profile = () => {
  // 프로필 페이지에서 현재 로그인 유저와 페이지의 유저가 같은 유저인지 확인
  const [isMyAccount, setIsMyAccount] = useState(false);
  const [isBookmarkActive, setIsBookmarkActive] = useState(false);

  // 팔로우 유무 확인
  const [isFollowUser, setIsFollowUser] = useState(false);

  // 리덕스 스토어의 현재 계정 정보
  const user = useSelector(({ users }) => {
    return users;
  });

  const navigate = useNavigate();

  // url에서 가져온 계정 번호
  const { userId } = useParams();

  const [myInfo, serverUser] = useQueries([
    {
      queryKey: ["myInfo", user.userId],
      queryFn: () => getPorfile(user.userId),
    },
    {
      queryKey: ["user", userId],
      queryFn: () => getPorfile(userId),
    },
  ]);

  useEffect(() => {
    setIsMyAccount(user.userId === Number(userId));
  }, [userId, user]);

  const onClickProfileUpdateBtnHandler = () => {
    navigate(`/profile/userModify/`);
  };

  const { mutate } = useMutation(postFollow, {
    onSuccess: (result) => {
      console.log("result: 팔로우 요청", result);
      if (
        result.status === 200 &&
        result.data.message === "팔로우 취소합니다."
      ) {
        console.log("팔로우 취소");
        setIsFollowUser(false);
      } else if (
        result.status === 200 &&
        result.data.message === "팔로우 합니다."
      ) {
        console.log("팔로우 했음");
        setIsFollowUser(true);
      }
    },
    onError: () => {
      console.log("팔로우 실패");
    },
  });

  const onClickFollowBtnHandler = () => {
    mutate(userId);
  };

  // console.log("myInfo: ", myInfo.isSuccess && myInfo.data.data);
  console.log("myInfo: ", myInfo);
  console.log("-------------------");
  console.log("serverUser: ", serverUser.data);

  return (
    <div>
      <div>
        {serverUser.isSuccess && (
          <div className="profile-wrap">
            <div className="profile_picture-container">
              <img
                src={`${process.env.REACT_APP_SERVER_LOCAL_URL}${serverUser.data?.data?.user_img}`}
                alt="프로필 이미지"
              />
            </div>
            <div>
              <div className="profile-side profile-side_fst">
                <div>{serverUser.data?.data?.nickname}</div>
                {isMyAccount && (
                  <div>
                    <button onClick={onClickProfileUpdateBtnHandler}>
                      편집
                    </button>
                  </div>
                )}
                {!isMyAccount && (
                  <div>
                    <button onClick={onClickFollowBtnHandler}>팔로우</button>
                  </div>
                )}
              </div>
              <div className="profile-side profile-side_sec">
                <div>
                  팔로잉 <span>{serverUser.data?.data?.following.length}</span>
                </div>
              </div>
              <div>
                레시피{" "}
                <span>{serverUser.data.data.articles_recipe.length}</span>
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
            {serverUser.isSuccess &&
              serverUser.data.data.articles_recipe.map((recipe) => {
                return (
                  <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                    <li>
                      <div>
                        <img
                          src={
                            recipe.api_recipe
                              ? `${recipe.recipe_thumbnail_api}`
                              : `${process.env.REACT_APP_SERVER_LOCAL_URL}${recipe.recipe_thumbnail}`
                          }
                          alt="레시피 썸네일"
                        />
                      </div>
                      <div className="recipe-detail">
                        <div>{recipe.title}</div>
                        <div>{recipe.description}</div>
                      </div>
                    </li>
                  </Link>
                );
              })}
          </ul>
        ) : (
          <ul className="recipes-wrap">
            {serverUser.isSuccess &&
              serverUser.data.data.bookmarked_articles.map((recipe) => {
                return (
                  <Link
                    key={recipe.id}
                    onClick={() => {
                      setIsBookmarkActive(false);
                    }}
                    to={`/profile/${recipe.article_recipe.author}`}
                  >
                    <li>
                      <div>
                        <img
                          src={
                            recipe.article_recipe.api_recipe
                              ? recipe.article_recipe.recipe_thumbnail_api
                              : `${process.env.REACT_APP_SERVER_LOCAL_URL}${recipe.article_recipe.recipe_thumbnail}`
                          }
                          alt="레시피 썸네일"
                        />
                      </div>
                      <div className="recipe-detail">
                        <div>{recipe.article_recipe.title}</div>
                        <div>{recipe.article_recipe.description}</div>
                        <div>
                          <p>{recipe.author_nickname}</p>
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
