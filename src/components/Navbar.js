import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation between routes
import './Navbar.css'; // Import the CSS file for styling

// Functional component for the app's Navbar
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">StreamList</h1> {/* App Logo */}
      <ul className="nav-links">
        {/* Navigation Links */}
        <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
        <li><Link to="/movies"><i className="fas fa-film"></i> Movies</Link></li>
        <li><Link to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Link></li>
        <li><Link to="/events"><i className="fas fa-calendar-plus"></i> Events</Link></li>
        <li><Link to="/about"><i className="fas fa-info-circle"></i> About</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar; // Export component to be used in the app
