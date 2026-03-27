import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard-overview.css';

export default function DashboardOverview() {
  return (
    <main className="dashboard-section">
      <h2>SUFC Account Dashboards</h2>
      <p className="dashboard-intro">
        These are the non-functional preview dashboards that donors and recipients will see after logging in.
      </p>

      <div className="dashboard-grid">
        <div className="dashboard-card donor-dashboard">
          <div className="dashboard-header">
            <h3>Donor Dashboard</h3>
            <span className="dashboard-tag">Donor</span>
          </div>
          <p className="dashboard-subtitle">Overview of your impact and upcoming donations.</p>
          <div className="dashboard-stats">
            <div className="stat">
              <span className="stat-label">Total Hair Donations</span>
              <span className="stat-value">3</span>
            </div>
            <div className="stat">
              <span className="stat-label">Monetary Support</span>
              <span className="stat-value">₱ 5,000</span>
            </div>
            <div className="stat">
              <span className="stat-label">Lives Touched</span>
              <span className="stat-value">7</span>
            </div>
          </div>
          <div className="dashboard-actions">
            <Link className="btn dashboard-btn" to="/donor-dashboard">Go to Donor</Link>
            <Link className="btn dashboard-btn secondary" to="/donor-dashboard">View Donation History</Link>
          </div>
        </div>

        <div className="dashboard-card recipient-dashboard">
          <div className="dashboard-header">
            <h3>Recipient Dashboard</h3>
            <span className="dashboard-tag">Recipient</span>
          </div>
          <p className="dashboard-subtitle">Track your application and upcoming wig fittings.</p>
          <div className="dashboard-stats">
            <div className="stat">
              <span className="stat-label">Application Status</span>
              <span className="stat-value status-pill">Under Review</span>
            </div>
            <div className="stat">
              <span className="stat-label">Next Appointment</span>
              <span className="stat-value">May 12, 2026</span>
            </div>
            <div className="stat">
              <span className="stat-label">Messages</span>
              <span className="stat-value">2 New</span>
            </div>
          </div>
          <div className="dashboard-actions">
            <Link className="btn dashboard-btn" to="/recipient-dashboard">View Application</Link>
            <Link className="btn dashboard-btn secondary" to="/recipient-dashboard">Upload Documents</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
