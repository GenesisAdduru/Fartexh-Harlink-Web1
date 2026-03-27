import React from 'react';
import styles from '../styles/HowItWorks.module.css';

const cards = [
  { title: 'Donate Hair', description: 'Give the gift of confidence to someone in need by donating your hair.', action: 'Donate' },
  { title: 'Request Hair', description: 'Apply for free wig with health certification.', action: 'Request' },
  { title: 'Monetary', description: 'Support our mission financially and earn reward points.', action: 'Give' },
];

const gotoRegister = () => {
  window.location.href = 'Register/register.html?mode=register';
};

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>How it works</h2>
        <p>Whether you want to donate or receive, we make the process simple and transparent.</p>
      </div>
      <div className={styles.grid}>
        {cards.map(({ title, description, action }) => (
          <article key={title} className={styles.card}>
            <h3>{title}</h3>
            <p>{description}</p>
            <button className={styles.cardBtn} onClick={gotoRegister}>{action}</button>
          </article>
        ))}
      </div>
    </section>
  );
}
