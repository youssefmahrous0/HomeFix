import API from "./api";

export const getProviders = (params) =>
  API.get("/providers", { params });

export const getProvider = (id) =>
  API.get(`/providers/${id}`);