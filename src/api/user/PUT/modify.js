import axios from "axios";

const userModify = async (obj) => {
  const { nickname, userId } = obj;

  const modifyData = {
    nickname,
  };

  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/userModify/${userId}/`,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5ODg2OTA2LCJpYXQiOjE2OTk4NDM3MDYsImp0aSI6ImI5MWY2ZGNhMzMyMzQ1YjJhMDg0YmI2ZjEzNDVjOGZjIiwidXNlcl9pZCI6MSwiZW1haWwiOiJkdWJvbzMxQGdtYWlsLmNvbSIsIm5pY2tuYW1lIjoiXHVjNmMzXHVkNTA0XHViMmU0IiwidXNlcl9pbWciOiIvbWVkaWEvdXNlcl9kZWZhbHQuanBnIn0.fukXgSmA1-OjyWYQynQzZxrchfIwCV9V_5r72Y1I30Y",
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
