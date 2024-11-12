import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; // Import auth from firebaseConfig
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle signup form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Firebase signup using email and password
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      setError('Signup failed. Please try again.');
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up for TransferHub</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
