import axios from "axios";

// Base URL for your Laravel backend
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Adjust the base URL as needed
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor (optional, for adding tokens or logging)
API.interceptors.request.use(
  (config) => {
    // Example: Add authorization token if needed
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor (optional, for handling errors globally)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally if required
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default API;
