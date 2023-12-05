import axios from "axios";

const socialLogin = async (socialInfo) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/kakao/user/`,
    data: socialInfo,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { socialLogin };
