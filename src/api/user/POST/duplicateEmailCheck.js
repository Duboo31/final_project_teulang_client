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
      return isPassed;
    }
  } catch (err) {
    console.log(err);
    if (err.response.status === 409) {
      return isPassed;
    }
    console.error(err);
    return isPassed;
  }
};

export { isDuplicateEmail };
