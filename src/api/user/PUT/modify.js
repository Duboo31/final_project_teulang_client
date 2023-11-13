import axios from "axios";

const userModify = async (obj) => {
  const { nickname, userId } = obj;

  const accessToken = localStorage.getItem("access");

  const modifyData = {
    nickname,
  };

  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/userModify/${userId}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: modifyData,
  };

  try {
    const response = await axios.request(config);
    console.log(response);
    return response;
  } catch (err) {
    return err;
  }
};

export { userModify };
