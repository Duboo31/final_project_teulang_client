import axios from "axios";

const editIngredient = async ({
  title,
  amount,
  expiration_date,
  id,
  userId,
}) => {
  const accessToken = localStorage.getItem("access");

  const dataSet = new FormData();

  if (expiration_date !== "") {
    dataSet.append("expiration_date", expiration_date);
  }
  if (amount !== "") {
    dataSet.append("amount", amount);
  }

  dataSet.append("title", title);

  const config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/${userId}/myFrige/${id}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
    data: dataSet,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (err) {
    console.log("수정: ", err);
    return err;
  }
};

export { editIngredient };
