import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { donationData } from '../data/donations';
import '../styles/admin-dashboard.css';


export default function AdminDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDonations = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return initialDonations;

    return initialDonations.filter((donation) =>
      [donation.name, donation.userId, donation.email, donation.wallet, donation.amount].some((value) =>
        value.toLowerCase().includes(term)
      )
    );
  }, [searchTerm]);

  return (
    <div className="admin-page">
      <header className="topbar">
        <div className="logo-wrap">
          <img src="/assets/logo.png" alt="Logo" className="logo" />
        </div>

        <button className="menu-btn" id="menuBtn" aria-label="Open menu" onClick={() => setIsMenuOpen((prev) => !prev)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <aside className={`side-menu ${isMenuOpen ? 'show' : ''}`} id="sideMenu">
        <Link to="/admin-dashboard" className="active">Overview</Link>
        <a href="#">Donors</a>
        <a href="#">Requesters</a>
        <a href="#">Reports</a>
        <Link to="/admin-event">Update Events</Link>
        <Link to="/communityforum-dashboard">Community Forum</Link>
      </aside>

      <main className="dashboard-container">
        <section className="hero-section">
          <p className="welcome-text">Welcome Back, YMCA!</p>
          <div className="hero-box">
            <h1>Overview</h1>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <div className="stat-label">₱ Donations</div>
            <div className="stat-value">13.5K</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">🤲 Hair Donations</div>
            <div className="stat-value">79</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">🦱 Hair Request</div>
            <div className="stat-value">5</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">💇 Wig Stock</div>
            <div className="stat-value">10</div>
          </div>
        </section>

        <section className="action-buttons">
          <button className="action-btn" disabled>Check Inventory</button>
          <Link to="/admin-event" className="action-btn">Update Events</Link>
          <Link to="/communityforum-dashboard" className="action-btn">Community Forum</Link>
        </section>

        <section className="monetary-donations">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <h2>Monetary Donations</h2>
            </div>
            <div className="panel-actions">
              <div className="search-box">
                <input id="searchInput" type="search" placeholder="Search donations" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button type="button" id="searchBtn" onClick={() => {}}>
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>UserID</th>
                  <th>Date and Time</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Wallet</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="donationTableBody">
                {filteredDonations.map((donation) => (
                  <tr key={donation.userId}>
                    <td>{donation.name}</td>
                    <td>{donation.userId}</td>
                    <td>{donation.date}</td>
                    <td>{donation.email}</td>
                    <td>{donation.amount}</td>
                    <td>{donation.wallet}</td>
                    <td>
                      <Link to={`/admin-donation-view/${donation.userId}`} className="view-arrow">
                        &#8250;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <span className="page active">1</span>
            <span className="page">2</span>
            <span className="page">3</span>
            <span className="page">4</span>
          </div>
        </section>
      </main>
    </div>
  );
}
