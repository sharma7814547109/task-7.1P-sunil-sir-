import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>DEV@Deakin</h2>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link> 
        </li>
        <li>
          <Link to="/login">Login</Link> 
        </li>
        <li>
          <Link to="/post">Post</Link> 
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
