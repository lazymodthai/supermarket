import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4900",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
