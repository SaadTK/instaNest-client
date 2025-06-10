import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://instanest-server.onrender.com/api",  
  withCredentials: true,  
});

export default axiosInstance;
