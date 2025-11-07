import axios from 'axios';
import { base_url } from './urls';



const axiosInstance = axios.create({
  baseURL: base_url,
//   timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'},
  withCredentials:true
});

// axiosInstance.interceptors.request.use(

// )
export default axiosInstance;