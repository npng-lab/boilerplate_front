import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>
        <img src="/logo.png" alt="Logo" className="logo_image" />
      </h1>
      <nav id="header_navi">
        <ul>
          <li>Info</li>
          <li>Menu</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
