// client/components/Login.js
import React, { useState } from 'react';
import { login } from '../services/authService';
import './Login.css';

const Login = ({ history }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await login(credentials);
      history.push('/'); // Redirect to home or protected page after login
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    }
  };

  // Handle Google login - dummy function for now, you need to implement it in authService.js
  const handleGoogleLogin = () => {
    alert("Google login not yet implemented.");
    // You can add logic here to use Google API or Firebase authentication for Google login
  };

  const handleSignupRedirect = () => {
    history.push('/signup'); // Redirect to a sign-up page if it exists
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
        <button onClick={handleGoogleLogin} className="google-login-button">
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
