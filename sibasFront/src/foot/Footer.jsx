import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <img src="image.png" alt="Logo" className="logo_image" />
        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>Email: contact@npngteam.com</p>
          <p>Phone: +82-10-1234-5678</p>
          <p>Address: 1234 NPNG Street, Seoul, South Korea</p>
        </div>
        <div className="footer-section">
          <h3>About the Team</h3>
          <p>Team Members:</p>
          <ul>
            <li>서원준</li>
            <li>박지훈</li>
            <li>이승혁</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>
            <a
              href="https://twitter.com/npngteam"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </p>
          <p>
            <a
              href="https://facebook.com/npngteam"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </p>
          <p>
            <a
              href="https://instagram.com/npngteam"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Team.NPNG. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
