import axios from "axios";

const isDuplicateEmail = async (email) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/signup-confirm/`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      email,
    }),
  };

  let isPassed = false;

  try {
    const response = await axios.request(config);
    if (response.status === 200) {
      isPassed = true;
      console.log("확인 결과: 사용가능한 이메일");
      return isPassed;
    }
  } catch (err) {
    console.log(err);
    if (err.response.status === 409) {
      console.log("이메일 중복 가입 차단");
      return isPassed;
    }
    console.error(err);
    return isPassed;
  }
};

export { isDuplicateEmail };
