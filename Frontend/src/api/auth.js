import axios from "axios";

export const login = (data) => {
  return axios.post("http://localhost:5000/api/auth/login", data);
};

export const register = (data) => {
  return axios.post("http://localhost:5000/api/auth/register", data);
};

export const forgotPassword = (data) => {
  return axios.post("http://localhost:5000/api/auth/forgot-password", data);
};