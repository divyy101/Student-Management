import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || (import.meta.env.MODE === "development" ? "http://localhost:4500" : "https://student-management-ze7i.onrender.com"),
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

