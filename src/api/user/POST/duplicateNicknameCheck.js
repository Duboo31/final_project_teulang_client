import axios from "axios";

const isDuplicateNickname = async (nickname) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_URL}/users/nickname-confirm/`,
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
      console.log("확인 결과: 사용가능한 닉네임");
      return isPassed;
    }
  } catch (err) {
    if (err.response.status === 409) {
      console.log("닉네임 중복 가입 차단");
      return isPassed;
    }
    console.error(err);
    return isPassed;
  }
};

export { isDuplicateNickname };
