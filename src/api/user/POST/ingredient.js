import axios from "axios";

const createIngredient = async ({ title, amount, expiration_date, userId }) => {
  const accessToken = localStorage.getItem("access");

  const dataSet = new FormData();

  if (expiration_date === "") {
    expiration_date = undefined;
  }

  const newIngredients = [
    {
      title,
      amount,
      expiration_date,
    },
  ];

  dataSet.append("data_set", JSON.stringify(newIngredients));

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.REACT_APP_SERVER_LOCAL_URL}/users/${userId}/myFrige/`,
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
    console.log(err);
    return err;
  }
};

export { createIngredient };
