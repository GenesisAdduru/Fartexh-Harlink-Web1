import React from 'react';
import styles from '../styles/AboutUs.module.css';

export default function AboutUs() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.images}>
          <img src="/assets/team.png" alt="SUFC Team" className={styles.image} />
          <img src="/assets/sufc team2.jpg" alt="SUFC Team 2" className={styles.image} />
        </div>
        <div className={styles.content}>
          <h2>About us</h2>
          <p>
            Strand Up for Cancer (SUFC) is a youth-led initiative of the Manila Downtown YMCA Youth Club
            dedicated to supporting patients who experience long-term hair loss caused by illness
            and medical treatment. Through hair donations, we craft wigs that restore not only
            appearance but also a sense of dignity, comfort, and renewed self-confidence.
            Each strand given is more than just hair—it's a gift of hope and strength.
          </p>
        </div>
      </div>
    </section>
  );
}
