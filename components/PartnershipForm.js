import React, { useState } from 'react';
import styles from '../styles/PartnershipForm.module.css';

export default function PartnershipForm() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback('Thanks! Your partnership interest has been sent.');
  };

  return (
    <section className={styles.formSection}>
      <div className={styles.formContainer}>
        <h2>Want to partner with Strand Up for Cancer?</h2>
        <p>Let’s connect and grow together!</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Phone Number" required />
          </div>
          <div className={styles.row}>
            <input type="text" placeholder="Company Name" required />
          </div>
          <textarea placeholder="Message" required />
          <button type="submit" className={styles.submit}>Submit</button>
        </form>
        {feedback && <p className={styles.feedback}>{feedback}</p>}
      </div>
    </section>
  );
}
