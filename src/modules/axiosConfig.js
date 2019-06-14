import axios from "axios";
import { SERVER_URL } from "../../config";
import store from "./../store";

let axiosInstance = () => axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "x-auth": store.getState().authorization.token
  }
});

export default axiosInstance;
