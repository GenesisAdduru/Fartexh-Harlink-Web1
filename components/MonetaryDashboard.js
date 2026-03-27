import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/monetary-dashboard.css';

export default function MonetaryDashboard() {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [currency, setCurrency] = useState('PHP');
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [fullName, setFullName] = useState('');
  const [amountWords, setAmountWords] = useState('');
  const [fileName, setFileName] = useState('No file selected');
  const [file, setFile] = useState(null);
  const [agree, setAgree] = useState(false);

  const handleAmountClick = (value) => {
    setSelectedAmount(value);
    setCustomAmount(value);
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setFileName('No file selected');
      setFile(null);
      return;
    }
    const maxSize = 10 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      alert('File is too large. Please upload a file not more than 10 MB.');
      e.target.value = '';
      setFileName('No file selected');
      setFile(null);
      return;
    }
    setFileName(selectedFile.name);
    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = customAmount.trim();
    if (!amount) {
      alert('Please select or enter an amount.');
      return;
    }
    if (!fullName.trim() || !amountWords.trim() || !file || !agree) {
      alert('Please complete all required fields.');
      return;
    }
    alert('Donation submitted successfully!');
    // Reset form
    setSelectedAmount('');
    setCustomAmount('');
    setCurrency('PHP');
    setPaymentMethod('bank');
    setFullName('');
    setAmountWords('');
    setFileName('No file selected');
    setFile(null);
    setAgree(false);
  };

  return (
    <main className="container">
      <div className="bg-wrapper">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <Link to="/donor-dashboard" className="back-btn">
        <i className="fa-solid fa-chevron-left" />
      </Link>

      <div className="top-logo">
        <img src="/assets/logo.png" alt="Logo" />
      </div>

      <section className="hero">
        <div className="hero-content">
          <h1>Monetary Donation</h1>
          <p>
            Let's boost your confidence. Request hair to support your journey of comfort and
            self-expression.
          </p>

          <div className="guidelines-box">
            <div className="guidelines-title">
              <i className="fa-solid fa-ribbon" />
              <span>Request Guidelines</span>
            </div>
            <div className="guidelines-grid">
              <div className="guideline-item">
                <i className="fa-solid fa-circle-check" />
                <span>Prepare the following:</span>
              </div>
              <div className="guideline-item">
                <i className="fa-solid fa-circle-check" />
                <span>Wait for us to message you directly to coordinate other important details</span>
              </div>
              <div className="guideline-sublist">
                <p>• Your story/journey</p>
                <p>• Related documents</p>
                <p>• Any photo of yourself</p>
              </div>
              <div className="guideline-item">
                <i className="fa-solid fa-circle-check" />
                <span>Fill up the wig request form</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="form-shell">
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="section-header">
              <i className="fa-solid fa-ribbon section-icon" />
              <h2>Donation details</h2>
            </div>

            <div className="amount-section">
              <label className="field-label">Select an amount</label>
              <div className="amount-grid">
                {[50, 100, 150, 200, 250].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`amount-card ${selectedAmount === value.toString() ? 'active' : ''}`}
                    onClick={() => handleAmountClick(value.toString())}
                  >
                    ₱ {value}
                  </button>
                ))}
              </div>

              <div className="form-grid two-col amount-inputs">
                <div className="form-group">
                  <label htmlFor="customAmount">Or Enter A Custom Amount</label>
                  <input
                    type="number"
                    id="customAmount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    min="1"
                    placeholder=""
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="currency">Currency <span>*</span></label>
                  <div className="select-wrap">
                    <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} required>
                      <option value="PHP">PHP</option>
                      <option value="USD">USD</option>
                    </select>
                    <div className="select-arrow">
                      <i className="fa-solid fa-chevron-down" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider" />

            <div className="billing-top">
              <h2>Billing Information</h2>
              <div className="payment-toggle">
                <button
                  type="button"
                  className={`toggle-btn ${paymentMethod === 'bank' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('bank')}
                >
                  Bank Transfer
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${paymentMethod === 'instapay' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('instapay')}
                >
                  InstaPay
                </button>
              </div>
            </div>

            <div className="billing-layout">
              <div className="payment-display">
                <div className={`payment-card bank-panel ${paymentMethod === 'bank' ? 'active-panel' : ''}`}>
                  <div className="payment-visual bank-box">
                    <div className="bank-logo-box">
                      <img src="/assets/bdo-logo.png" alt="BDO Logo" />
                    </div>
                    <div className="bdo-text">BDO</div>
                  </div>
                  <h3>Venus Alinsod</h3>
                  <p>004560025684</p>
                </div>

                <div className={`payment-card instapay-panel ${paymentMethod === 'instapay' ? 'active-panel' : ''}`}>
                  <div className="payment-visual qr-box">
                    <div className="qr-grid">
                      <span></span><span className="pink"></span><span></span><span className="pink"></span>
                      <span className="pink"></span><span></span><span className="pink"></span><span></span>
                      <span></span><span className="pink"></span><span></span><span className="pink"></span>
                      <span className="pink"></span><span></span><span className="pink"></span><span></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="billing-fields">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name <span>*</span></label>
                  <p className="helper-text">Full Name must be the same on the ACCOUNT NAME used for donations</p>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-grid two-col billing-row">
                  <div className="form-group">
                    <label htmlFor="amountWords">Amount in Words <span>*</span></label>
                    <input
                      type="text"
                      id="amountWords"
                      value={amountWords}
                      onChange={(e) => setAmountWords(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="amountNumber">Amount in Numbers</label>
                    <input
                      type="text"
                      id="amountNumber"
                      value={customAmount ? Number(customAmount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="upload-block">
                  <label htmlFor="proofFile">Proof of Donation <span>*</span></label>
                  <p className="helper-text">Kindly insert the screenshot/photo or any proof of donation</p>
                  <p className="helper-text light">Upload 1 supported file: PDF, document, or image. Max 10 MB</p>
                  <div className="file-upload-row">
                    <input
                      type="file"
                      id="proofFile"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <button
                      type="button"
                      id="proofUploadBtn"
                      className="upload-btn"
                      onClick={() => document.getElementById('proofFile').click()}
                    >
                      <i className="fa-solid fa-arrow-up-from-bracket" />
                      Add File
                    </button>
                    <span id="proofFileName" className="file-name">{fileName}</span>
                  </div>
                </div>

                <div className="checkbox-row">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <label htmlFor="agree">
                    I agree to the terms and conditions and understand that this donation is non-refundable.
                  </label>
                </div>

                <div className="submit-wrap">
                  <button type="submit" className="submit-btn">
                    <i className="fa-solid fa-paper-plane" />
                    <span>Submit Donation</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
