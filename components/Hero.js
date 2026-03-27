import React from 'react';
import styles from '../styles/Hero.module.css';

export default function Hero({ onDonateClick }) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.logoContainer}>
          <img src="/assets/logo.png" alt="SUFC Logo" className={styles.logo} />
        </div>
        <h1 className={styles.title}>STRAND UP FOR CANCER</h1>
        <p className={styles.subtitle}>Hope begins, one at a time</p>
        <button className={styles.donateBtn} onClick={onDonateClick}>
          <span className={styles.ribbonIcon}>🎗</span> Donate Now
        </button>
      </div>
    </section>
  );
}
