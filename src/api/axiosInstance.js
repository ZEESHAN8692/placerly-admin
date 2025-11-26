import axios from 'axios';
import { base_url } from './urls';



const axiosInstance = axios.create({
  baseURL: base_url,
  //   timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (token) {
      config.headers["x-access-token"] = token;
      // config.headers.Authorization=token
      // config.headers.Authorization=`Bearer ${token}`
    }
    return config;
  },
  function (err) {
    Promise.reject(err);
  }
);
export default axiosInstance;