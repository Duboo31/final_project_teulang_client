import axios from "axios";

const deleteUserAccount = async (userInfo) => {
  const { password, userId } = userInfo;
  const accessToken = localStorage.getItem("access");

  const config = {
    method: "DELETE",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/api/signout/${userId}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      password,
    }),
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    return err;
  }
};

export { deleteUserAccount };