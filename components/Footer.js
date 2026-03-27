import React from 'react';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.left}>
          <img src="/assets/logo.png" alt="Footer Logo" className={styles.logo} />
          <div>
            <h3>STRAND UP FOR CANCER</h3>
            <p>
              Manila Downtown YMCA<br />
              Binondo, Manila, Philippines
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <p>Subscribe for the latest event updates</p>
          <div className={styles.subscribeBox}>
            <input type="email" placeholder="Your Email Address" />
            <button>Sign Up</button>
          </div>
          <div className={styles.socialIcons}>
            <span>🌐</span>
            <span>📷</span>
            <span>✉️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
