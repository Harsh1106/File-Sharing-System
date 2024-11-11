import { useRef, useState, useEffect } from 'react';
import logo from './TransferHub.jpg';
import './App.css';
import { uploadFile } from './services/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const fileInputRef = useRef();

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  // Function to copy the link to clipboard
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
        <button onClick={() => onUploadClick()}>Upload Now</button>
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

export default App;