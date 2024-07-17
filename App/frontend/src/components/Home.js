import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import logo from '../assets/logo.png'; 
import illustration from '../assets/illustration.jpg'; 

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Signup</Link>
          <Link to="/loginpage" className="nav-link">Admin</Link>
        </div>
      </nav>
      <div className="content-section">
        <div className="welcome-section">
          <h2 className="welcome-text">Welcome to Quiz App</h2>
          <p className="description-text">
            This is a quiz application where you can test your knowledge in various programming languages.
          </p>
        </div>
        <div className="image-section">
          <img src={illustration} alt="Big" className="illustration" />
        </div>
      </div>
    </div>
  );
};

export default Home;
