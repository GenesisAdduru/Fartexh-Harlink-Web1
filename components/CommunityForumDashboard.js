import React from 'react';
import { Link } from 'react-router-dom';

export default function CommunityForumDashboard() {
  return (
    <div style={{ padding: '40px', maxWidth: '960px', margin: 'auto' }}>
      <h1>Community Forum Dashboard</h1>
      <p>Community interactions and posts section (placeholder).</p>
      <p><Link to="/admin-dashboard">Back to Admin Dashboard</Link></p>
    </div>
  );
}
