import React, { useState } from "react";
import "../../styles/user/follow.css";

const Follow = ({ followData, openFollowerPopup }) => {
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
              >
                팔로워
              </h3>
              <h3
                onClick={() => {
                  setIsFollowerActive(false);
                }}
              >
                팔로잉
              </h3>
              <span>X</span>
            </div>
            <ul>
              {/* {isFollowerActive ? (
                <>
                  {followers.map((follow) => {
                    return <li key={follow.id}>{follow.nickname}</li>;
                  })}
                </>
              ) : (
                <>
                  {following.map((following) => {
                    return <li key={following.id}>{following.nickname}</li>;
                  })}
                </>
              )} */}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Follow;
