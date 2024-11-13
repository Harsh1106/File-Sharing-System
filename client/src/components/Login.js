// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../services/authService'; // Import your own login service
// import { handleGoogleLogin } from '../firebase/firebaseConfig'; // Correct import for Firebase Google login function
// import './Login.css'; // Import styles for login page
// import '../App.js'; // Assuming you need this for global styling or App component

// const Login = () => {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Clear previous errors
//     try {
//       await login(credentials); // Call login service
//       navigate('/'); // Redirect to home or protected page after login
//     } catch (error) {
//       setError('Login failed. Please check your credentials.');
//       console.error('Login failed:', error);
//     }
//   };

//   // Handle Google login using Firebase
//   const handleGoogleLoginClick = async () => {
//     try {
//       const user = await handleGoogleLogin(); // Call Firebase Google login function
//       console.log('Google login successful:', user);
//       navigate('/'); // Redirect to home or protected page after successful login
//     } catch (error) {
//       setError('Google login failed. Please try again.');
//       console.error('Google login failed:', error);
//     }
//   };

//   // Redirect to signup page
//   const handleSignupRedirect = () => {
//     navigate('/signup'); // Redirect to signup page
//   };

//   return (
//     <div className="login-container">
//       <h2>Login to TransferHub</h2>
//       <form onSubmit={handleSubmit} className="login-form">
//         <input
//           type="text"
//           name="username"
//           onChange={handleChange}
//           placeholder="Username"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           onChange={handleChange}
//           placeholder="Password"
//           required
//         />
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit">Login</button>
//       </form>

//       <div className="additional-options">
//         <button onClick={handleGoogleLoginClick} className="google-login-button">
//           Login with Google
//         </button>
//         <button onClick={handleSignupRedirect} className="signup-button">
//           Sign Up
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService'; // Import your own login service
import { handleGoogleLogin } from '../firebase/firebaseConfig'; // Correct import for Firebase Google login function
import './Login.css'; // Import styles for login page
import '../App.js'; // Assuming you need this for global styling or App component

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await login(credentials); // Call login service
      navigate('/dashboard'); // Redirect to Dashboard page after login
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    }
  };

  // Handle Google login using Firebase
  const handleGoogleLoginClick = async () => {
    try {
      const user = await handleGoogleLogin(); // Call Firebase Google login function
      console.log('Google login successful:', user);
      navigate('/dashboard'); // Redirect to Dashboard page after successful login
    } catch (error) {
      setError('Google login failed. Please try again.');
      console.error('Google login failed:', error);
    }
  };

  // Redirect to signup page
  const handleSignupRedirect = () => {
    navigate('/signup'); // Redirect to signup page
  };

  return (
    <div className="login-container">
      <h2>Login to TransferHub</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>

      <div className="additional-options">
        <button onClick={handleGoogleLoginClick} className="google-login-button">
          Login with Google
        </button>
        <button onClick={handleSignupRedirect} className="signup-button">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
