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
    const { access, refresh } = response.data;
    saveLocalStorageToken(access, refresh);
    return response;
  } catch (err) {
    return err;
  }
};

export { postLogin };
