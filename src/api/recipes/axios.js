import axios from "axios";

const instance = axios.create({
  baseURL: "https://teulang.shop/",
});

export default instance;
