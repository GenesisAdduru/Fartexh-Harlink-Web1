import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/settings-dashboard.css';

const STORAGE_KEY = "hairlinkUserSettingsProfile";

const defaultProfile = {
  name: "Maxie Tio",
  email: "MaxieTio@gmail.com",
  phone: "+63 | 09134567891",
  role: "Donor",
  points: 120,
  referralCode: "GIVE - 67AICE",
  image: "https://cdn-icons-png.flaticon.com/512/847/847969.png"
};

export default function SettingsDashboard() {
  const [profile, setProfile] = useState(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  const saveProfile = (newProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    setProfile(newProfile);
  };

  const handleEdit = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (tempProfile) {
      setProfile(tempProfile);
    }
    setIsEditing(false);
  };

  const handleSave = () => {
    saveProfile(profile);
    setIsEditing(false);
    alert(`Profile updated successfully. Your status is now ${profile.role}.`);
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (role) => {
    setProfile(prev => ({ ...prev, role }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newProfile = { ...profile, image: event.target.result };
      saveProfile(newProfile);
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="settings-page">
      <Link to="/donor-dashboard" className="back-btn">
        <i className="fa-solid fa-chevron-left"></i>
        Back to Dashboard
      </Link>

      <section className="profile-shell">
        <div className="top-bg"></div>

        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar-wrap">
              <img id="profileImage" src={profile.image} alt="Profile" />
              <label htmlFor="avatarInput" className="camera-btn">
                <i className="fa-solid fa-camera"></i>
              </label>
              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
            </div>

            <h1>
              <span id="displayName">{profile.name}</span>
              <span className="user-id">#0040</span>
            </h1>

            <div className={`status-badge ${profile.role.toLowerCase()}`}>
              {profile.role}
            </div>
          </div>

          <div className="profile-body">
            <div className="profile-top-row">
              <h2>PROFILE INFO</h2>
              <button className="edit-btn" onClick={handleEdit} style={{ display: isEditing ? 'none' : 'inline-flex' }}>
                <i className="fa-solid fa-pen"></i>
                Edit
              </button>
            </div>

            <div className="info-list">
              <div className="info-card">
                <div className="info-icon">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="info-content">
                  <label>Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="info-content">
                  <label>Phone</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <i className="fa-regular fa-id-card"></i>
                </div>
                <div className="info-content">
                  <label>Community Role</label>
                  <div className="role-row">
                    <input
                      type="text"
                      value={profile.role}
                      disabled
                      style={{ display: isEditing ? 'none' : 'block' }}
                    />
                    <select
                      value={profile.role}
                      onChange={(e) => handleRoleChange(e.target.value)}
                      className={`role-select ${isEditing ? 'show' : ''}`}
                    >
                      <option value="Donor">Donor</option>
                      <option value="Recipient">Recipient</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className={`save-row ${isEditing ? '' : 'hidden'}`}>
              <button className="save-btn" onClick={handleSave}>Save Changes</button>
              <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>

            <div className="status-note">
              Your current status is <strong>{profile.role}</strong>.
            </div>

            <div className="reward-card">
              <div className="reward-icon">⭐</div>
              <div>
                <h3>Rewards Points</h3>
                <div className="points">{profile.points}</div>
                <p>Points earned through referrals & donations</p>
              </div>
            </div>

            <div className="referral-card">
              <div className="referral-head">
                <i className="fa-solid fa-gift"></i>
                <h3>Your Referral Code</h3>
              </div>
              <div className="referral-code">{profile.referralCode}</div>
              <p>Share to earn more points</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}