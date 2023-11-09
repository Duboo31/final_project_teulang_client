import axios from "axios";
import { saveLocalStorageToken } from "../saveLocalToken";

const postLogin = async (loginData) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/login/`,
    data: loginData,
  };

  try {
    const response = await axios.request(config);
    console.log("로그인 성공 data : ", response.data);
    const { access, refresh } = response.data;
    saveLocalStorageToken(access, refresh);
    return response;
  } catch (err) {
    console.log("로그인 실패 err :", err);
    return err;
  }
};

export { postLogin };
