import React from 'react';
import styles from '../styles/UpcomingEvents.module.css';

export default function UpcomingEvents({ countdown = {} }) {
  return (
    <section className={styles.events}>
      <div className={styles.overlay}></div>
      <div className={styles.card}>
        <p className={styles.meta}>📅 April 18, 2024 | 📍 Philippine General Hospital</p>
        <h2 className={styles.title}>Upcoming Event</h2>
        <button className={styles.readMore} onClick={() => alert('Loading more upcoming SUFC events...')}>Read More</button>
        <div className={styles.countdown}>
          <p>The event starts in</p>
          <div className={styles.timerBoxes}>
            {Object.entries(countdown).map(([label, value]) => (
              <div key={label} className={styles.timeBox}>
                <span>{String(value).padStart(2, '0')}</span>
                <small>{label.charAt(0).toUpperCase() + label.slice(1)}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
