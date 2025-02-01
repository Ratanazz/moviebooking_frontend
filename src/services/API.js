import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Important for Sanctum
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Don't split or modify the token - use it as is
      config.headers.Authorization = `Bearer ${token}`;
      // Debug log
      console.log('Using token:', token);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('Response error:', error.response);
    
    if (error.response?.status === 401) {
      // Log the full error for debugging
      console.log('Authorization error:', error.response);
      
      // Optionally clear storage and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;