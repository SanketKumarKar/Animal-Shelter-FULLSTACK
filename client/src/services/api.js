// api.js
import axios from "axios";
// API base URL
const API = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle 401 responses globally
API.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);

export default API;
