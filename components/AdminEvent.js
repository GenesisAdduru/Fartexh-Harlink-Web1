import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminEvent() {
  return (
    <div style={{ padding: '40px', maxWidth: '960px', margin: 'auto' }}>
      <h1>Update Events</h1>
      <p>Admin event management page (placeholder). Implement event CRUD here.</p>
      <p><Link to="/admin-dashboard">Back to Admin Dashboard</Link></p>
    </div>
  );
}
