import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; 
import './Login.css'; // Import your CSS file for styling
import logo from '../assets/logo.png'; // Path to your logo

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loginStatus, setLoginStatus] = useState(null); // State to track login status
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData); 
      localStorage.setItem('token', data.token); 
      setLoginStatus(true); 
      navigate('/quiz'); 
    } catch (error) {
      console.error('Invalid credentials');
      setLoginStatus(false); 
    }
  };

  return (
    <div className="login-page">
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
      <div className="login-container">
        <div className="login-content">
          <h2 className="login-heading">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
            />
            <button type="submit" className="login-button">Login</button>
          </form>
          {loginStatus === true && <p className="login-success">Login successful!</p>}
          {loginStatus === false && <p className="login-failed">Login failed. Please check your credentials.</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
