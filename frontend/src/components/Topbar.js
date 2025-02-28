import React from 'react';
import { Link } from 'react-scroll';
import './styles/Topbar.css';

const Topbar = () => {
  return (
    <nav className="topbar">
      <ul>
        <li><Link to="hero" smooth={true} duration={500}>Home</Link></li>
        <li><Link to="about" smooth={true} duration={500}>Quem Somos</Link></li>
        <li><Link to="pets-list" smooth={true} duration={500}>Adote</Link></li>
        <li><Link to="contact" smooth={true} duration={500}>Contato</Link></li>
      </ul>
    </nav>
  );
};

export default Topbar;
