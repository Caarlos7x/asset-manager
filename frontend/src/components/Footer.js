import React from 'react';
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="#top" className="logo">Asset Manager</a>
      </div>
      <div className="footer-right">
        <a href="https://facebook.com" className="social-icon">Falar com o suporte</a>
      </div>
    </footer>
  );
};

export default Footer;
