import axios from "axios";

const api = axios.create({
  baseURL: "http://157.26.174.83:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;