import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.module.css';

export default function Navbar() {
  const navigate = useNavigate();

  const goToAuth = (mode) => {
    navigate(`/auth?mode=${mode}`);
  };

  return (
    <nav className="navbar">
      <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src="/assets/PinkRibbon.png" alt="Ribbon" className="ribbon" />
        Strand Up for Cancer
      </div>
      <div className="auth">
        <button className="login" onClick={() => goToAuth('login')}>
          Login
        </button>
        <button className="register" onClick={() => goToAuth('register')}>
          Register
        </button>
      </div>
    </nav>
  );
}
