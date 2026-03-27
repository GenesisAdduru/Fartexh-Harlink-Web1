import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/settings-dashboard.css';

export default function SettingsDashboard() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    privateProfile: false,
    theme: 'light',
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('sufcUserType');
    localStorage.removeItem('sufcUserEmail');
    navigate('/');
  };

  return (
    <div className="settings-container">
      <h1>Account Settings</h1>

      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="settings-item">
          <label>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
            />
            Email Notifications
          </label>
        </div>
        <div className="settings-item">
          <label>
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={() => handleToggle('smsNotifications')}
            />
            SMS Notifications
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>Privacy</h2>
        <div className="settings-item">
          <label>
            <input
              type="checkbox"
              checked={settings.privateProfile}
              onChange={() => handleToggle('privateProfile')}
            />
            Make Profile Private
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>Appearance</h2>
        <div className="settings-item">
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            name="theme"
            value={settings.theme}
            onChange={handleSelectChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-primary" onClick={handleSaveSettings}>
          Save Settings
        </button>
        <button className="btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
