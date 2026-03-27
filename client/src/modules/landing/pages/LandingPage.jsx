import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import AboutUs from '../components/AboutUs';
import PartnersSection from '../components/PartnersSection';
import UpcomingEvents from '../components/UpcomingEvents';
import PartnershipForm from '../components/PartnershipForm';

export default function LandingPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ days: 45, hours: 3, minutes: 22, seconds: 55 });

  const handleDonateClick = () => {
    navigate('/auth?mode=register');
  };

  const partnerLogos = [
    '/assets/logo.jpg',
    '/assets/team.png',
    '/assets/PinkRibbon.png',
  ];

  return (
    <div className="landing-page">
      <Hero onDonateClick={handleDonateClick} />
      <HowItWorks />
      <AboutUs />
      <PartnersSection logos={partnerLogos} />
      <UpcomingEvents countdown={countdown} />
      <PartnershipForm />
    </div>
  );
}
