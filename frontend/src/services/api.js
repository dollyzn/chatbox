import axios from "axios";

console.log(process.env.REACT_APP_BACKEND_URL);
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

export default api;
