import axios from "axios";

const isDuplicateNickname = async (nickname) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/nickname-confirm/`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      nickname,
    }),
  };

  let isPassed = false;

  try {
    const response = await axios.request(config);
    if (response.status === 200) {
      isPassed = true;
      return isPassed;
    }
  } catch (err) {
    if (err.response.status === 409) {
      return isPassed;
    }
    console.error(err);
    return isPassed;
  }
};

export { isDuplicateNickname };
