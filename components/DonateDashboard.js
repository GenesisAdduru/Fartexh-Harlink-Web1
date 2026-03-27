import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/donate-dashboard.css';

export default function DonateDashboard() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    hairLength: '',
    hairColor: '',
    address: '',
    reason: '',
  });
  const [fileName, setFileName] = useState('No file selected');
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) {
      setFileName('No file selected');
      setFile(null);
      return;
    }
    const maxSize = 10 * 1024 * 1024;
    if (selected.size > maxSize) {
      alert('File is too large. Please upload an image not more than 10 MB.');
      e.target.value = '';
      setFileName('No file selected');
      setFile(null);
      return;
    }

    setFileName(selected.name);
    setFile(selected);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, phone, hairLength, hairColor, address, reason } = formData;

    if (!fullName || !email || !phone || !hairLength || !hairColor || !address || !reason || !file) {
      alert('Please complete all required fields.');
      return;
    }

    alert('Donation form submitted successfully!');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      hairLength: '',
      hairColor: '',
      address: '',
      reason: '',
    });
    setFile(null);
    setFileName('No file selected');
  };

  return (
    <div className="main-container">
      <div className="bg-wrapper">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <main className="container">
        <Link to="/donor-dashboard" className="back-btn">
          <i className="fa-solid fa-chevron-left" />
        </Link>

        <section className="hero">
          <div className="hero-left">
            <div className="logo-circle">
              <img src="/assets/logo.png" alt="Logo" />
            </div>
          </div>

          <div className="hero-content">
            <h1>Donate Hair</h1>
            <p>Your hair donation will help create a wig for someone experiencing medical hair loss.</p>

            <div className="guidelines-box">
              <div className="guidelines-title">
                <i className="fa-solid fa-ribbon"></i>
                <span>Donation Guidelines</span>
              </div>
              <div className="guidelines-grid">
                <div className="guideline-item"><i className="fa-solid fa-circle-check"></i><span>Hair must be at least 10 inches long</span></div>
                <div className="guideline-item"><i className="fa-solid fa-circle-check"></i><span>Hair should be tied, sealed, and secured in a paper bag/non-plastic container with a label containing your full name</span></div>
                <div className="guideline-item"><i className="fa-solid fa-circle-check"></i><span>Colored hair is accepted</span></div>
                <div className="guideline-item"><i className="fa-solid fa-circle-check"></i><span>Must be untangled</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="form-shell">
          <div className="form-card">
            <form id="donationForm" onSubmit={onSubmit}>
              <div className="section-header">
                <i className="fa-solid fa-ribbon"></i>
                <h2>Donation Details</h2>
              </div>

              <div className="form-grid two-col">
                {['fullName', 'email', 'phone'].map((field, idx) => (
                  <div className="form-group" key={field}>
                    <label htmlFor={field}>{field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)} <span>*</span></label>
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      id={field}
                      value={formData[field]}
                      onChange={(e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }))}
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="divider" />

              <div className="section-title-only">
                <h2>Hair Information</h2>
              </div>

              <div className="form-grid two-col short-grid">
                <div className="form-group">
                  <label htmlFor="hairLength">Hair Length <span>*</span></label>
                  <div className="select-wrap">
                    <select
                      id="hairLength"
                      value={formData.hairLength}
                      onChange={(e) => setFormData((prev) => ({ ...prev, hairLength: e.target.value }))}
                      required
                    >
                      <option value="" disabled>Select hair length</option>
                      <option value="Long">Long</option>
                      <option value="Short">Short</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="hairColor">Natural Hair Color <span>*</span></label>
                  <div className="select-wrap">
                    <select
                      id="hairColor"
                      value={formData.hairColor}
                      onChange={(e) => setFormData((prev) => ({ ...prev, hairColor: e.target.value }))}
                      required
                    >
                      <option value="" disabled>Select hair color</option>
                      <option value="Black">Black</option>
                      <option value="Brown">Brown</option>
                      <option value="Light">Light</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="checkbox-group">
                <input type="checkbox" id="treatedHair" name="treatedHair" />
                <label htmlFor="treatedHair">My hair has been chemically treated (colored, permed, etc.)</label>
              </div>

              <div className="form-grid two-col">
                <div className="form-group">
                  <label htmlFor="address">Shipping Address (where you'll send from) <span>*</span></label>
                  <textarea
                    id="address"
                    rows="5"
                    value={formData.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reason">Kindly describe the reason for your hair donation. <span>*</span></label>
                  <textarea
                    id="reason"
                    rows="5"
                    value={formData.reason}
                    onChange={(e) => setFormData((prev) => ({ ...prev, reason: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="upload-group">
                <label htmlFor="hairPhoto">Upload a clear picture of the hair to be donated. MAX 10 MB <span>*</span></label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="hairPhoto"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={onFileChange}
                  />
                  <button
                    type="button"
                    id="uploadBtn"
                    className="upload-btn"
                    onClick={() => document.getElementById('hairPhoto').click()}
                  >
                    <i className="fa-solid fa-arrow-up-from-bracket" />
                    Add File
                  </button>
                  <span id="fileName" className="file-name">{fileName}</span>
                </div>
              </div>

              <div className="delivery-wrap">
                <div className="delivery-left">
                  <h3>Delivery Details (for donations sent via courier):</h3>
                  <p><strong>Address:</strong> Manila Downtown YMCA at 945 Sabino Padilla St, Binondo, Manila, 1006 Metro Manila</p>
                  <p><strong>Receiving Days and Time:</strong> Monday to Sunday from 9 AM to 7 PM</p>
                </div>

                <div className="delivery-right">
                  <p><strong>Contact Name:</strong> Venus May Alinsod</p>
                  <p><strong>Contact Number:</strong> 0917-847-4270</p>
                </div>
              </div>

              <div className="submit-wrap">
                <button type="submit" className="donate-btn">
                  <i className="fa-solid fa-ribbon" />
                  <span>Donate it</span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
