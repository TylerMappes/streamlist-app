import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for active link styling
import './Navbar.css'; // Import the CSS file for styling

// Functional component for the app's Navbar
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">EZ StreamList</h1> {/* App Logo */}
      <ul className="nav-links">
        {/* Navigation Links */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')} // Apply 'active' class if link is active
          >
            <i className="fas fa-home"></i> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? 'active' : '')} // Apply 'active' class if link is active
          >
            <i className="fas fa-film"></i> Movies
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'active' : '')} // Apply 'active' class if link is active
          >
            <i className="fas fa-shopping-cart"></i> Cart
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/events"
            className={({ isActive }) => (isActive ? 'active' : '')} // Apply 'active' class if link is active
          >
            <i className="fas fa-calendar-plus"></i> Events
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'active' : '')} // Apply 'active' class if link is active
          >
            <i className="fas fa-info-circle"></i> About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; // Export component to be used in the app
