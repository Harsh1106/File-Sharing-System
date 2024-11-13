// client/services/authService.js
import axios from 'axios';

// Set default base URL for axios
axios.defaults.baseURL = 'http://localhost:8000'; // Adjust as necessary for your backend API

// Register function to create a new user
export const register = async (userData) => {
  try {
    const response = await axios.post('/api/register', userData); // Adjust API endpoint as needed
    return response.data; // Return user data or response object as necessary
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed. Please try again.");
    throw error; // Throw error for further handling in the component
  }
};

// Existing login function
export const login = async (credentials) => {
  try {
    const response = await axios.post('/api/login', credentials); // API endpoint for login
    const token = response.data.token; // Assuming response contains a token

    if (token) {
      localStorage.setItem('token', token); // Store the token in localStorage
      setAuthToken(token); // Set token in axios default headers for subsequent requests
    }

    return token; // Return token or user data if needed
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials.");
    return null; // Return null or handle error as needed
  }
};

// Logout function to remove the token
export const logout = () => {
  localStorage.removeItem('token'); // Remove token from localStorage
  setAuthToken(null); // Clear token from axios default headers
};

// Set auth token for all Axios requests
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Attach token to all requests
  } else {
    delete axios.defaults.headers.common['Authorization']; // Remove token if null
  }
};

// Load token if it exists in localStorage
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token); // Set token in axios default headers if it exists
}
