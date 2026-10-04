import axios from "axios";

const api = axios.create({
  baseURL: "https://nattyexpress-backend.onrender.com/api",
  withCredentials: true,
});

export default api;
