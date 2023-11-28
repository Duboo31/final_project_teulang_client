import React, { useState } from "react";
import "../../styles/user/follow.css";

// css
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Follow = ({ followData, openFollowerPopup, setOpenFollowerPopup }) => {
  const [isFollowerActive, setIsFollowerActive] = useState(false);

  const { followers, following } = followData;

  console.log("followers: ", followers);
  console.log("following: ", following);

  return (
    <>
      {openFollowerPopup && (
        <div className="follow-wrap">
          <div className="follow-container">
            <div>
              <h3
                onClick={() => {
                  setIsFollowerActive(true);
                }}
                className={isFollowerActive ? "follower" : "following"}
              >
                팔로워
              </h3>
              <h3
                onClick={() => {
                  setIsFollowerActive(false);
                }}
                className={!isFollowerActive ? "follower" : "following"}
              >
                팔로잉
              </h3>
              <FontAwesomeIcon
                icon={faCircleXmark}
                onClick={() => {
                  setOpenFollowerPopup(false);
                }}
              />
            </div>
            <ul>
              {isFollowerActive ? (
                <>
                  {followers.length === 0 && <div>목록이 없습니다.</div>}
                  {followers.map((follow) => {
                    return (
                      <li key={follow.id}>
                        <span>{follow.nickname}</span>
                        <Link
                          onClick={() => {
                            setOpenFollowerPopup(false);
                          }}
                          to={`/profile/${follow.id}`}
                        >
                          프로필보기
                        </Link>
                      </li>
                    );
                  })}
                </>
              ) : (
                <>
                  {following.length === 0 && <div>목록이 없습니다.</div>}
                  {following.map((following) => {
                    return (
                      <li key={following.id}>
                        <span>{following.nickname}</span>
                        <Link
                          onClick={() => {
                            setOpenFollowerPopup(false);
                          }}
                          to={`/profile/${following.id}`}
                        >
                          프로필보기
                        </Link>
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Follow;
