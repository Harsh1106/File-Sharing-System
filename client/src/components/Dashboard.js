// // client/src/components/Dashboard.js

// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { uploadFile } from '../services/api';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState('');
//   const fileInputRef = useRef();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const onUploadClick = () => {
//     fileInputRef.current.click();
//   };

//   useEffect(() => {
//     const getImage = async () => {
//       if (file) {
//         try {
//           const data = new FormData();
//           data.append('file', file);
//           const response = await uploadFile(data);
//           setResult(response?.path || 'Error: No link generated');
//         } catch (error) {
//           console.error('Upload failed:', error);
//         }
//       }
//     };
//     getImage();
//   }, [file]);

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(result).then(() => alert("Link copied!"));
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className="dashboard">
//       <h2>File Upload Dashboard</h2>
//       <button onClick={onUploadClick}>Upload File</button>
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//         onChange={(e) => setFile(e.target.files[0])}
//       />
//       {result && (
//         <div>
//           <a href={result} target="_blank" rel="noopener noreferrer">Download Link</a>
//           <button onClick={copyToClipboard}>Copy Link</button>
//         </div>
//       )}
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Dashboard;


// client/src/components/Dashboard.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Dashboard.css';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Clear auth token
//     navigate('/login'); // Redirect to login page after logout
//   };

//   return (
//     <div className="dashboard-container">
//       <h1>Welcome to Your Dashboard</h1>
//       <p>Welcome to your TransferHub Dashboard! Here, you can manage your files and settings.</p>
//       <button onClick={() => navigate('/upload')} className="upload-btn">
//         Go to Upload Page
//       </button>
//       <button onClick={handleLogout} className="logout-btn">
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../services/api'; // Import your upload API service
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [file, setFile] = useState(null);
  const [uploadLink, setUploadLink] = useState('');
  const [error, setError] = useState('');

  // Handle logout by clearing token and redirecting to login
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear auth token
    navigate('/login'); // Redirect to login page after logout
  };

  const onUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleFileUpload = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await uploadFile(formData); // Send file to server
        if (response && response.path) {
          setUploadLink(response.path); // Store file URL
          setError(''); // Reset any previous errors
        } else {
          setError('Failed to upload file. Please try again.');
        }
      } catch (err) {
        setError('Error uploading file. Please try again.');
        console.error('Upload error:', err);
      }
    }
  };

  const copyToClipboard = () => {
    if (uploadLink) {
      navigator.clipboard.writeText(uploadLink)
        .then(() => alert("Link copied!"))
        .catch(err => console.error("Error copying link:", err));
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <p>Welcome to your TransferHub Dashboard! Here, you can manage your files and settings.</p>

      <button onClick={() => navigate('/upload')} className="upload-btn">
        Go to Upload Page
      </button>

      <div className="upload-section">
        <button onClick={onUploadClick} className="upload-btn">Choose File</button>
        {file && <button onClick={handleFileUpload} className="upload-btn">Upload</button>}
        
        {/* File input (hidden), shown when user clicks Choose File */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Show link and copy button if file is uploaded */}
        {uploadLink && (
          <div>
            <p>File uploaded! Use the link below:</p>
            <a href={uploadLink} target="_blank" rel="noopener noreferrer">{uploadLink}</a>
            <button onClick={copyToClipboard} className="copy-link-btn">Copy Link</button>
          </div>
        )}

        {/* Error message for upload issues */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>

      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Dashboard;
