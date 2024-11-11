// client/App.js
import { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import logo from './TransferHub.jpg';
import './App.css';
import { uploadFile } from './services/api';
import { logout } from './services/authService'; // No need to import login here
import Login from './components/Login'; // Import the Login component

function Home() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fileInputRef = useRef();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    history.push('/login'); // Redirect to login after logout
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
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setResult(response.path);
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
            <button onClick={() => onUploadClick()}>Upload Now</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={() => history.push('/login')}>Login</button>
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
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
