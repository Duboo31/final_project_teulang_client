import axios from "axios";

const getPorfile = async (userId) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/${userId}/`,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    return err;
  }
};

export { getPorfile };
