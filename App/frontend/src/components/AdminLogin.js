import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api'; 

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: 'Admin', password: 'Admin@123' });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLogin(formData); // Call adminLogin API function
      localStorage.setItem('adminToken', response.data.token); // Store admin token in localStorage or cookies
      navigate('/admin-panel'); // Navigate to admin panel upon successful login
    } catch (error) {
      setLoginError('Invalid username or password'); // Set error message
      console.error('Error logging in admin:', error); // Log any errors during login
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Admin Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </div>
  );
};

export default AdminLogin;
