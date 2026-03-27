import React from 'react';
import './Footer.module.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="left">
          <img src="/assets/logo.jpg" alt="Footer Logo" className="logo" />
          <div>
            <h3>STRAND UP FOR CANCER</h3>
            <p>
              Manila Downtown YMCA<br />
              Binondo, Manila, Philippines
            </p>
          </div>
        </div>
        <div className="right">
          <p>Subscribe for the latest event updates</p>
          <div className="subscribeBox">
            <input type="email" placeholder="Your Email Address" />
            <button>Sign Up</button>
          </div>
          <div className="socialIcons">
            <span>🌐</span>
            <span>📷</span>
            <span>✉️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
