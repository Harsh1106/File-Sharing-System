// client/services/authService.js
import axios from 'axios';

// Set up the base URL for the server
axios.defaults.baseURL = 'http://localhost:8000'; // Adjust to your server's URL if different

// Login function that retrieves a token and stores it
export const login = async (credentials) => {
  try {
    const response = await axios.post('/api/login', credentials); // Adjust endpoint if necessary
    const token = response.data.token;

    if (token) {
      localStorage.setItem('token', token); // Store token in localStorage
      setAuthToken(token); // Set the token for future requests
    }

    return token;
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please check your credentials.");
    return null;
  }
};

// Logout function that clears the token
export const logout = () => {
  localStorage.removeItem('token'); // Remove token on logout
  setAuthToken(null); // Clear token from headers
};

// Function to set the authorization token in Axios
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Immediately set token from localStorage if it exists, for session persistence
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}
