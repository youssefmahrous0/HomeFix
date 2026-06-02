import axios from "axios";

export const login = (data) => {
  return axios.post("https://homefix-production-0bc9.up.railway.app/api/auth/login", data);
};

export const register = (data) => {
  return axios.post("https://homefix-production-0bc9.up.railway.app/api/auth/register", data);
};

export const forgotPassword = (data) => {
  return axios.post("https://homefix-production-0bc9.up.railway.app/api/auth/forgot-password", data);
};