import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueries, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

// components
// import Follow from "../../component/follow/Follow";
import Ingredients from "../../component/user/Ingredients";

// api
import { getPorfile } from "../../api/user/GET/profile";
import { postFollow } from "../../api/user/POST/follow";
// css
import "../../styles/user/profile.css";
import "../../styles/recipe/recipe.css";

const Profile = () => {
  const queryClient = useQueryClient();
  // 프로필 페이지에서 현재 로그인 유저와 페이지의 유저가 같은 유저인지 확인
  const [isMyAccount, setIsMyAccount] = useState(false);

  // const [isBookmarkActive, setIsBookmarkActive] = useState(false);

  // 프로필에서 하단 탭 활성화 여부 / 순서
  // 내 레시피 1, 북마크 레시피 2, 내 냉장고 3
  const [tabPages, setTabPages] = useState(1);

  // 팔로우 유무 확인
  const [isFollowUser, setIsFollowUser] = useState(false);
  // 팔로워 카운트 실시간 확인
  const [followerCnt, setFollwerCnt] = useState(0);
  // 팔로워 팝업 활성화 여부
  const [openFollowerPopup, setOpenFollowerPopup] = useState(false);

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

  useEffect(() => {
    setFollwerCnt(serverUser.data?.data?.followers.length);

    const targetNickname = serverUser.data?.data?.nickname;

    for (let i = 0; i < myInfo.data?.data?.following.length; i++) {
      const nickname = myInfo.data?.data?.following[i].nickname;
      if (nickname === targetNickname) {
        setIsFollowUser(true);
        return;
      } else {
        setIsFollowUser(false);
      }
    }
  }, [myInfo, serverUser, isFollowUser]);

  const onClickProfileUpdateBtnHandler = () => {
    navigate(`/profile/userModify/`);
  };

  const { mutate } = useMutation(postFollow, {
    onSuccess: (result) => {
      queryClient.invalidateQueries();
      console.log("result: 팔로우 요청", result);
      if (
        result.status === 200 &&
        result.data.message === "팔로우 취소합니다."
      ) {
        console.log("팔로우 취소");
      } else if (
        result.status === 200 &&
        result.data.message === "팔로우 합니다."
      ) {
        console.log("팔로우 했음");
      }
    },
    onError: () => {
      console.log("팔로우 실패");
    },
  });

  const onClickFollowBtnHandler = () => {
    mutate(userId);
  };

  return (
    <div>
      <div>
        {myInfo.isSuccess && serverUser.isSuccess && (
          <div className="profile-wrap">
            <div className="profile_picture-container">
              <img
                src={`${process.env.REACT_APP_SERVER_URL}${serverUser.data?.data?.user_img}`}
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
                {!isMyAccount && myInfo?.data?.data?.nickname && (
                  <div className={isFollowUser ? "follow" : ""}>
                    <button onClick={onClickFollowBtnHandler}>
                      {isFollowUser ? "팔로잉" : "팔로우"}
                    </button>
                  </div>
                )}
              </div>
              <ul className="profile-side profile-side_sec">
                <li>
                  레시피{" "}
                  <span>{serverUser.data.data.articles_recipe.length}</span>
                </li>
                <li
                  onClick={() => {
                    setOpenFollowerPopup((cur) => !cur);
                  }}
                >
                  팔로워 <span>{followerCnt}</span>
                </li>
                <li
                  onClick={() => {
                    setOpenFollowerPopup((cur) => !cur);
                  }}
                >
                  팔로우 <span>{serverUser.data?.data?.following.length}</span>
                </li>
              </ul>
            </div>
            {/* <Follow
              followData={serverUser.data.data}
              openFollowerPopup={openFollowerPopup}
            /> */}
          </div>
        )}
      </div>
      <ul className="select-tab">
        <li
          onClick={() => {
            setTabPages(1);
          }}
          className={tabPages === 1 ? "active" : ""}
        >
          내 레시피
        </li>
        {!serverUser.data?.data?.is_admin && (
          <li
            onClick={() => {
              setTabPages(2);
            }}
            className={tabPages === 2 ? "active" : ""}
          >
            북마크 레시피
          </li>
        )}
        {isMyAccount && (
          <li
            onClick={() => {
              setTabPages(3);
            }}
            className={tabPages === 3 ? "active" : ""}
          >
            내 냉장고
          </li>
        )}
      </ul>
      <div>
        {tabPages === 1 && (
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
                              : `${process.env.REACT_APP_SERVER_URL}${recipe.recipe_thumbnail}`
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
        )}
        {tabPages === 2 && (
          <ul className="recipes-wrap">
            {serverUser.isSuccess &&
              serverUser.data.data.bookmarked_articles.map((recipe) => {
                return (
                  <Link
                    key={recipe.id}
                    // onClick={() => {
                    //   setIsBookmarkActive(false);
                    // }}
                    to={`/recipe/${recipe.article_recipe_id}`}
                  >
                    <li>
                      <div>
                        <img
                          src={
                            recipe.article_recipe.api_recipe
                              ? recipe.article_recipe.recipe_thumbnail_api
                              : `${process.env.REACT_APP_SERVER_URL}${recipe.article_recipe.recipe_thumbnail}`
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
        {tabPages === 3 && isMyAccount && <Ingredients />}
      </div>
    </div>
  );
};

export default Profile;
