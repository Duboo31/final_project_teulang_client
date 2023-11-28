import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.teulang.shop/",
});

export default instance;
