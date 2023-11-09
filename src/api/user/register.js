import axios from "axios";

const postRegister = async (registerData) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/signup/`,
    data: registerData,
  };

  try {
    const { data } = await axios.request(config);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { postRegister };
