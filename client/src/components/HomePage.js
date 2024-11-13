import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../services/api'; // Assuming you have a service for file upload
import './HomePage.css'; // Ensure you have CSS for styling

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(''); // File upload result (link)
  const [error, setError] = useState(''); // Error state for failed uploads
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume user is authenticated for now
  const fileInputRef = useRef();
  const navigate = useNavigate();

  // Check if the user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (!token) {
      setIsAuthenticated(false); // If no token, set authentication state to false
      navigate('/login'); // Redirect user to login page
    }
  }, [navigate]);

  // Handle file selection when user clicks upload button
  const onUploadClick = () => {
    if (isAuthenticated) {
      fileInputRef.current.click(); // Trigger the hidden file input
    } else {
      alert('Please log in to upload files');
    }
  };

  // Upload the selected file
  useEffect(() => {
    const uploadImage = async () => {
      if (file && isAuthenticated) {
        try {
          setError(''); // Clear any previous errors
          const data = new FormData();
          data.append('file', file); // Append selected file to FormData

          // Call the uploadFile function (assumed to be defined in api.js)
          const response = await uploadFile(data);
          if (response && response.path) {
            setResult(response.path); // Store the file link
          } else {
            setError('Failed to get a valid response from the server.');
          }
        } catch (error) {
          setError('Error uploading file. Please try again.');
          console.error('Error uploading file:', error);
        }
      }
    };

    uploadImage(); // Trigger file upload
  }, [file, isAuthenticated]);

  // Copy the file link to clipboard
  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result)
        .then(() => alert('Link copied to clipboard'))
        .catch((err) => console.error('Could not copy text:', err));
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from storage
    setIsAuthenticated(false); // Set authentication state to false
    navigate('/login'); // Redirect user to login page
  };

  return (
    <div className="home-page">
      <h1>Welcome to TransferHub</h1>
      <p>Upload your files and get a downloadable link!</p>

      {/* Upload button */}
      <button onClick={onUploadClick} className="upload-button">Upload Now</button>

      {/* Hidden file input triggered by the "Upload Now" button */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => setFile(e.target.files[0])} // Handle file selection
      />

      {/* Display file upload result (if available) */}
      {result && (
        <div>
          <p>Your file has been uploaded successfully!</p>
          <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
          <button onClick={copyToClipboard} className="copy-link-button">Copy Link</button>
        </div>
      )}

      {/* Display error message if any */}
      {error && <div className="error-message">{error}</div>}

      {/* Logout button */}
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default HomePage;
