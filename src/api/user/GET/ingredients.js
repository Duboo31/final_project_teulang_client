import axios from "axios";

const getMyIngredients = async (userId) => {
  const accessToken = localStorage.getItem("access");

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/${userId}/myFrige/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    console.log("재료 가져오기 실패", err);
    return err;
  }
};

export { getMyIngredients };
