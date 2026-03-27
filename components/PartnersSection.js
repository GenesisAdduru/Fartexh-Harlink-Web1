import React, { useEffect, useState } from 'react';
import styles from '../styles/PartnersSection.module.css';

export default function PartnersSection({ logos }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % logos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [logos.length]);

  return (
    <section className={styles.partners}>
      <h2>Our Partners</h2>
      <div className={styles.slider}>
        <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }}>
          {logos.map((logo, idx) => (
            <img key={idx} src={logo} alt="Partner" className={styles.logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
