import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const navigate = useNavigate();

  const goToAuth = (mode) => {
    navigate(`/auth?mode=${mode}`);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src="/assets/PinkRibbon.png" alt="Ribbon" className={styles.ribbon} />
        Strand Up for Cancer
      </div>
      <div className={styles.auth}>
        <button className={styles.login} onClick={() => goToAuth('login')}>
          Login
        </button>
        <button className={styles.register} onClick={() => goToAuth('register')}>
          Register
        </button>
      </div>
    </nav>
  );
}
