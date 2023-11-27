import axios from "axios";

const postRegister = async (registerData) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/signup/`,
    data: registerData,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    return err;
  }
};

export { postRegister };
