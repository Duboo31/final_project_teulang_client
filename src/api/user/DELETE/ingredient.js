import axios from "axios";

const deleteIngredient = async (data) => {
  const accessToken = localStorage.getItem("access");

  const config = {
    method: "DELETE",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/${data.userId}/myFrige/${data.id}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    return err;
  }
};

export { deleteIngredient };
