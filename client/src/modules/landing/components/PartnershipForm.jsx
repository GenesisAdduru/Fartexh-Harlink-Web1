import React, { useState } from 'react';
import styles from '../styles/PartnershipForm.module.css';

export default function PartnershipForm() {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Partnership Form Submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
    setFormData({
      organizationName: '',
      contactPerson: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <section className={styles.form}>
      <div className={styles.container}>
        <h2>Become a Partner</h2>
        <p>Join us in our mission to make a difference</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="organizationName"
              placeholder="Organization Name"
              value={formData.organizationName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="contactPerson"
              placeholder="Contact Person"
              value={formData.contactPerson}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <textarea
              name="message"
              placeholder="Tell us about your organization and partnership ideas"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Send Partnership Request
          </button>
        </form>
      </div>
    </section>
  );
}
