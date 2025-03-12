import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // Adjust if backend is on a different port

// Register User
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

// Login User
export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};
