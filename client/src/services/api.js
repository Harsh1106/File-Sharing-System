import axios from 'axios';
import { initializeApp } from 'firebase/app';  // Modular import for Firebase
import { getApps, getApp } from 'firebase/app';  // Modular imports for checking Firebase app
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';  // Modular imports for Firebase storage

// Centralize the API URL to make future updates easier
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';  // Supports .env for flexibility

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();  // Check if app is already initialized
const storage = getStorage(app);  // Get Firebase storage instance

// Function to handle file upload with improved error handling
export const uploadFile = async (data) => {
  try {
    const file = data.file;  // Assuming 'data' contains the file object
    const fileRef = ref(storage, `files/${file.name}`);  // Create a reference to the file in Firebase Storage

    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(fileRef, file);  // Upload file to the reference
    const downloadURL = await getDownloadURL(snapshot.ref);  // Get the download URL of the uploaded file

    // Log the successful upload and the download URL
    console.log('File uploaded successfully. Download URL:', downloadURL);

    // Optionally, send the download URL to your backend if needed
    const response = await axios.post(`${API_URL}/upload`, { downloadURL }, {
      headers: {
        'Content-Type': 'application/json',  // Set the correct headers
      },
    });

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
