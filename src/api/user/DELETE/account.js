import axios from "axios";

const deleteUserAccount = async (userInfo) => {
  const { password, userId } = userInfo;

  const config = {
    method: "DELETE",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/api/signout/${userId}/`,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5ODQwMDYwLCJpYXQiOjE2OTk3OTY4NjAsImp0aSI6IjExZDE4NGNlNTc3ZTRhNzY4OTA5NTNiNGYyMzA4MDgwIiwidXNlcl9pZCI6MSwiZW1haWwiOiJkdWJvbzMxQGdtYWlsLmNvbSIsIm5pY2tuYW1lIjoiXHVjMmUwXHViNzdjXHViYTc0IiwidXNlcl9pbWciOiIvbWVkaWEvdXNlcl9kZWZhbHQuanBnIn0.Gc9HAfp4fghSZU5-f_7btQL2XllUCoZBDrelh2sghd8",
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
