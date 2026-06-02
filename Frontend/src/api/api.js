import axios from "axios";

const API = axios.create({
  baseURL: "https://homefix-production-0bc9.up.railway.app",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;