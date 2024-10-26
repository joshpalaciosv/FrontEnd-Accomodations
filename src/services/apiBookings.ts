import axios from "axios";

export const apiBookings = axios.create({
  baseURL: "https://apibookingsaccomodations-production.up.railway.app",
});
