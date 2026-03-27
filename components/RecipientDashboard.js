import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/recipient-dashboard.css';

export default function RecipientDashboard() {
  return (
    <div>
      <header>
        <h1>Hair Recipient Dashboard</h1>
      </header>
      <nav>
        <Link to="/recipient-dashboard">Profile</Link>
        <Link to="/request-hair-dashboard">My Requests</Link>
        <Link to="/settings-dashboard">Notifications</Link>
      </nav>
      <div className="container">
        <div className="card">
          <h2>Profile</h2>
          <p>Name: John Smith</p>
          <p>Email: john@example.com</p>
        </div>
        <div className="card">
          <h2>My Hair Requests</h2>
          <table>
            <thead>
              <tr>
                <th>Request Date</th>
                <th>Requested Length</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2026-03-01</td>
                <td>12 inches</td>
                <td>Pending</td>
              </tr>
              <tr>
                <td>2026-02-15</td>
                <td>8 inches</td>
                <td>Approved</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
