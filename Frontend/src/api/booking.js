import API from "./api";

export const createBooking = (data) =>
  API.post("/booking", data);

export const myBookings = () =>
  API.get("/booking/my");