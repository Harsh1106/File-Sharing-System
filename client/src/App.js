import { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import logo from './TransferHub.jpg';
import './App.css';
import { uploadFile } from './services/api';
import { logout } from './services/authService';
import Login from './components/Login';
import Signup from './components/Signup';

function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page after logout
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Redirect to signup page
  };

  const onUploadClick = () => {
    if (isAuthenticated) {
      fileInputRef.current.click();
    } else {
      alert('Please log in to upload files');
    }
  };

  useEffect(() => {
    const getImage = async () => {
      if (file && isAuthenticated) {
        try {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

          const response = await uploadFile(data);
          if (response && response.path) {
            setResult(response.path);
          } else {
            console.error('Error: Invalid response from server');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };
    getImage();
  }, [file, isAuthenticated]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
      .then(() => {
        alert("Link copied");
      })
      .catch(err => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <div className='container'>
      <img src={logo} alt="TransferHub" />
      <div className='wrapper'>
        <h1>Welcome To TransferHub</h1>
        <p>Effortless File Transfers, Anytime, Anywhere.</p>

        {isAuthenticated ? (
          <>
            <button onClick={onUploadClick}>Upload Now</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={handleSignupRedirect}>Signup</button>
          </>
        )}

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {result && (
          <>
            <a href={result} target="_blank" rel="noopener noreferrer">
              {result}
            </a>
            <button onClick={copyToClipboard}>Copy Link</button>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
