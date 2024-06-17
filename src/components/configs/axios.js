import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.elbim.uz/api/v1",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
