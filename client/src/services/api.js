// // client/services/api.js
// import axios from 'axios';

// const API_URL = 'http://localhost:8000';

// // Function to handle file upload with improved error handling
// export const uploadFile = async (data) => {
//   try {
//     const response = await axios.post(`${API_URL}/upload`, data);
//     return response.data;
//   } catch (error) {
//     console.error('Error while uploading the file:', error.message);
//     alert('Failed to upload file. Please try again.');
//     return null; // Return null or handle accordingly
//   }
// };
import axios from 'axios';

// Centralize the API URL to make future updates easier
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';  // Supports .env for flexibility

// Function to handle file upload with improved error handling
export const uploadFile = async (data) => {
  try {
    // Perform the file upload request
    const response = await axios.post(`${API_URL}/upload`, data);
    return response.data;  // Return the response data if the upload is successful
  } catch (error) {
    // Check if the error response is available from the server
    if (error.response) {
      // The server responded with an error status
      console.error('Error response:', error.response);
      alert(`Failed to upload file: ${error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      // No response from the server
      console.error('Error request:', error.request);
      alert('No response from the server. Please check your connection.');
    } else {
      // Other errors (e.g., network, invalid request)
      console.error('General error:', error.message);
      alert('Failed to upload file. Please try again.');
    }

    return null;  // Return null or handle accordingly
  }
};
