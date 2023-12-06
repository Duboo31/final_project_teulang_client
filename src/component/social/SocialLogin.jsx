import React from "react";

// css
import "../../styles/user/socialBtn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const SocialLogin = () => {
  const url = `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/kakao/login/`;

  return (
    <>
      <div className="social-hr"></div>
      <button
        className="social-btn"
        onClick={() => {
          window.location.href = url;
        }}
      >
        <FontAwesomeIcon icon={faComment} />
        <span>카카오 로그인</span>
      </button>
    </>
  );
};

export default SocialLogin;
