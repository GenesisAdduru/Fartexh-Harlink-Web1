import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/donor-dashboard.css';

const initialData = {
  name: 'Fiona Can',
  points: 38,
  rewardGoal: 100,
  referralCode: 'FIONA38',
};

export default function DonorDashboard() {
  const [userData, setUserData] = useState(initialData);
  const [displayPoints, setDisplayPoints] = useState(0);
  const [referralInput, setReferralInput] = useState('');

  useEffect(() => {
    let points = 0;
    const target = userData.points;
    const step = Math.max(1, Math.ceil(target / 40));

    const interval = setInterval(() => {
      points += step;
      if (points >= target) {
        points = target;
        clearInterval(interval);
      }
      setDisplayPoints(points);
    }, 25);

    return () => clearInterval(interval);
  }, [userData.points]);

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralInput || userData.referralCode);
      alert('Referral code copied!');
    } catch {
      alert('Copy failed. Please copy manually.');
    }
  };

  const progressPercent = Math.min((displayPoints / userData.rewardGoal) * 100, 100);

  return (
    <div className="page-scale">
      <header>
        <div className="logo">
          <img src="/assets/logo.jpg" alt="Logo" />
        </div>
        <nav className="desktop-nav">
          <Link to="/">Home</Link>
          <a href="#history">History</a>
          <a href="#points">Points</a>
          <a href="#notifications">Notification</a>
          <Link to="/settings-dashboard">Settings</Link>
        </nav>
      </header>

      <div className="container">
        <h1 className="welcome">Welcome Back, {userData.name}!</h1>

        <section className="points-card">
          <div className="points-info">
            ⓘ &nbsp; 10 points earned for every donation and code referral<br />
            Star Points <span className="star-inline">★</span> {displayPoints}
          </div>

          <div className="progress-wrapper">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="progress-star" style={{ left: `${progressPercent}%` }}>★</div>
          </div>

          <div className="star-row">{Array.from({ length: 9 }).map((_, i) => (
            <span key={i}>★</span>
          ))}</div>

          <p className="reward-text">
            {displayPoints >= userData.rewardGoal
              ? 'Congratulations! You can now claim your free wig reward!'
              : `Free wig for every ${userData.rewardGoal} star points`}
          </p>
        </section>

        <section className="bottom-actions">
          <div className="referral-group">
            <label htmlFor="referral">Referral Code:</label>
            <input
              type="text"
              id="referral"
              value={referralInput}
              placeholder={userData.referralCode}
              onChange={(e) => setReferralInput(e.target.value)}
            />
            <button className="copy-btn" id="copyBtn" onClick={copyReferralCode}>
              {referralInput ? 'Copy Code' : 'Copy Default'}
            </button>
          </div>

          <div className="bottom-buttons">
            <Link to="/community-forum" className="forum-btn">Community Forum</Link>
            <Link to="/haircare" className="hairCair-btn">Hair Care Tips</Link>
          </div>
        </section>

        <section className="rewards-section">
          <div className="rewards-title">View Claimable Reward</div>
          <div className="ribbon">🎀</div>

          <div className="reward-cards">
            <div className="reward-card">
              <h3>Donate Hair</h3>
              <p>Give the gift of confidence to someone in need by donating your hair.</p>
              <Link to="/donate">
                <button className="card-btn">Donate</button>
              </Link>
            </div>
            <div className="reward-card">
              <h3>Request Hair</h3>
              <p>Apply for free wig with health certification.</p>
              <Link to="/wig-request">
                <button className="card-btn">Request</button>
              </Link>
            </div>
            <div className="reward-card">
              <h3>Monetary</h3>
              <p>Support our mission financially and earn reward points.</p>
              <Link to="/admin">
                <button className="card-btn">Give</button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
