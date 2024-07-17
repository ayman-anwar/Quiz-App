import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api'; 
import './Signup.css'; 
import logo from '../assets/logo.png'; 

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [signupSuccess, setSignupSuccess] = useState(false); 
  const [signupError, setSignupError] = useState(false); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData); 
      setSignupSuccess(true); 
      setTimeout(() => {
        navigate('/login'); 
      }, 2000); 
    } catch (error) {
      console.error('Error registering user', error);
      setSignupError(true); 
    }
  };

  return (
    <div className="signup-page">
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <a href="/login" className="nav-link">Login</a>
          <a href="/signup" className="nav-link">Signup</a>
          <a href="/loginpage" className="nav-link">Admin</a>
        </div>
      </nav>
      <div className="signup-container">
        <div className="signup-content">
          <h2 className="signup-heading">Signup</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="signup-input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="signup-input"
              required
            />
            <button type="submit" className="signup-button">
              Signup
            </button>
          </form>
          {signupSuccess && <p className="signup-success">Signup successful! Redirecting to login page...</p>}
          {signupError && <p className="signup-error">Error registering user. Please try again.</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
