import axios from "axios";

const userModify = async (modifyInfo) => {
  let { nickname, profile, password, passwordConfirm, userId } = modifyInfo;

  const accessToken = localStorage.getItem("access");

  const modifyData = new FormData();

  if (password !== "" && password !== undefined) {
    modifyData.append("password", password);
  } else if (nickname !== undefined && nickname !== "") {
    modifyData.append("nickname", nickname);
  } else if (profile.length > 0) {
    modifyData.append("user_img", profile[0]);
  }

  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_URL}/users/userModify/${userId}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
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