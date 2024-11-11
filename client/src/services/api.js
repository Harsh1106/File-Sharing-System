// client/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Function to handle file upload with improved error handling
export const uploadFile = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, data);
    return response.data;
  } catch (error) {
    console.error('Error while uploading the file:', error.message);
    alert('Failed to upload file. Please try again.');
    return null; // Return null or handle accordingly
  }
};
