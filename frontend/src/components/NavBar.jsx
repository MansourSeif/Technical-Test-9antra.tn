import React, { useState } from 'react';
import './Navbar.css'; // Ensure to import your CSS for styling
import Logo from '../images/LogoBridge.png';

const Navbar = () => {
  const [selected, setSelected] = useState('home'); // State to track selected item

  const handleSelect = (item) => {
    setSelected(item);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <ul className="navbar-links">
        <li
          className={`navbar-item ${selected === 'home' ? 'selected' : ''}`}
          onClick={() => handleSelect('home')}
        >
          Home
        </li>
        <li
          className={`navbar-item ${selected === 'paths' ? 'selected' : ''}`}
          onClick={() => handleSelect('paths')}
        >
          Paths
        </li>
        <li
          className={`navbar-item ${selected === 'courses' ? 'selected' : ''}`}
          onClick={() => handleSelect('courses')}
        >
          Courses
        </li>
        <li
          className={`navbar-item ${selected === 'events' ? 'selected' : ''}`}
          onClick={() => handleSelect('events')}
        >
          Events
        </li>
        <li
          className={`navbar-item ${selected === 'about' ? 'selected' : ''}`}
          onClick={() => handleSelect('about')}
        >
          About Us
        </li>
      </ul>
      <div className="navbar-auth">
        <span className="navbar-item login">Sign In</span>
        <button className="navbar-button register">Register Now</button>
      </div>
    </nav>
  );
};

export default Navbar;
