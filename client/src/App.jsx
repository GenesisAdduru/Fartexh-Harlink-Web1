import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/shared';
import { LandingPage } from './modules/landing';
import { AuthPage } from './modules/accounts';
import { SettingsDashboard } from './modules/accounts';
import { DonatePage, DonorDashboard } from './modules/donation';
import { RequestHairPage } from './modules/wigrequest';
import { CommunityForumPage } from './modules/community';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/settings-dashboard" element={<SettingsDashboard />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/wig-request" element={<RequestHairPage />} />
        <Route path="/community" element={<CommunityForumPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
