import axios from "axios";

const postFollow = async (userId) => {
  const accessToken = localStorage.getItem("access");

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/follow/${userId}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    return err;
  }
};

export { postFollow };
