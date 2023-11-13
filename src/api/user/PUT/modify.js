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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5ODQwMDYwLCJpYXQiOjE2OTk3OTY4NjAsImp0aSI6IjExZDE4NGNlNTc3ZTRhNzY4OTA5NTNiNGYyMzA4MDgwIiwidXNlcl9pZCI6MSwiZW1haWwiOiJkdWJvbzMxQGdtYWlsLmNvbSIsIm5pY2tuYW1lIjoiXHVjMmUwXHViNzdjXHViYTc0IiwidXNlcl9pbWciOiIvbWVkaWEvdXNlcl9kZWZhbHQuanBnIn0.Gc9HAfp4fghSZU5-f_7btQL2XllUCoZBDrelh2sghd8",
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
