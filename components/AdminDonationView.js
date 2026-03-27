import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { donationData } from '../data/donations';
import '../styles/admin-donation-view.css';

export default function AdminDonationView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const donation = donationData.find((item) => item.id === id);

  return (
    <div className="page-wrapper">
      <div className="donation-view-card">
        <div className="top-bar">
          <button className="back-btn" onClick={() => navigate('/admin-dashboard')}>
            ← Back to Dashboard
          </button>
        </div>

        <div className="title-row">
          <div className="ribbon-icon">🎗</div>
          <h1>Monetary Donation View</h1>
        </div>

        <div id="donationContainer" className="donation-container">
          {donation ? (
            <div className="donation-detail-card">
              <div className="donation-left">
                <div className="donor-info-section">
                  <div className="donor-header">
                    <div className="avatar">{donation.name.charAt(0)}</div>
                    <div className="donor-name-date">
                      <h2>{donation.name}</h2>
                      <p>{donation.date}</p>
                    </div>
                  </div>

                  <div className="details-text">
                    <p><strong>Name:</strong><br />{donation.name}</p>
                    <p><strong>Amount of Donation (in numbers):</strong><br />₱ {donation.amountNumber}</p>
                    <p><strong>Amount of Donation (in words):</strong><br />{donation.amountWords}</p>
                  </div>
                </div>
              </div>

              <div className="proof-section">
                <img src={donation.proofImage} alt="Proof of Donation" onError={(e) => e.target.src = '/assets/logo.png'} />
              </div>
            </div>
          ) : (
            <div className="not-found">Donation not found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
