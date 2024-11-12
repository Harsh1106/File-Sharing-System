// client/services/authService.js
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

// Register function to create a new user
export const register = async (userData) => {
  try {
    const response = await axios.post('/api/register', userData); // Adjust API endpoint as needed
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed. Please try again.");
    throw error;
  }
};

// Existing login function
export const login = async (credentials) => {
  try {
    const response = await axios.post('/api/login', credentials);
    const token = response.data.token;

    if (token) {
      localStorage.setItem('token', token);
      setAuthToken(token);
    }

    return token;
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials.");
    return null;
  }
};

// Logout function to remove the token
export const logout = () => {
  localStorage.removeItem('token');
  setAuthToken(null);
};

// Set auth token for all Axios requests
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Load token if it exists in localStorage
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}
