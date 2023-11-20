const getUserInfoInLocalStorage = () => {
  const accessToken = localStorage.getItem("access");

  if (accessToken) {
    const payload = JSON.parse(localStorage.getItem("payload"));

    const userInfo = {
      userId: payload["user_id"],
      userEmail: payload["email"],
      nickname: payload["nickname"],
      profileImg: payload["user_img"],
    };

    return userInfo;
  } else {
    return false;
  }
};

export { getUserInfoInLocalStorage };
