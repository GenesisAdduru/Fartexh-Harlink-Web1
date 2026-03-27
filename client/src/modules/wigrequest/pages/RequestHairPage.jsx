import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/request-dashboard.css';

export default function RequestHairDashboard() {
  const [supportingDocs, setSupportingDocs] = useState(null);
  const [referencePhoto, setReferencePhoto] = useState(null);
  const [supportingDocsName, setSupportingDocsName] = useState('No file selected');
  const [referencePhotoName, setReferencePhotoName] = useState('No file selected');
  const [hearAbout, setHearAbout] = useState([]);
  const [shareInfo, setShareInfo] = useState([]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'supporting') {
      setSupportingDocs(file);
      setSupportingDocsName(file ? file.name : 'No file selected');
    } else {
      setReferencePhoto(file);
      setReferencePhotoName(file ? file.name : 'No file selected');
    }
  };

  const handleCheckboxChange = (e, type) => {
    const value = e.target.value;
    if (type === 'hearAbout') {
      setHearAbout(prev => e.target.checked ? [...prev, value] : prev.filter(item => item !== value));
    } else {
      setShareInfo(prev => e.target.checked ? [...prev, value] : prev.filter(item => item !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (hearAbout.length === 0) {
      alert("Please select at least one answer for 'Where did you hear about us?'.");
      return;
    }

    if (shareInfo.length === 0) {
      alert("Please select at least one answer for the sharing consent section.");
      return;
    }

    alert("Request submitted successfully!");
    setSupportingDocs(null);
    setReferencePhoto(null);
    setSupportingDocsName('No file selected');
    setReferencePhotoName('No file selected');
    setHearAbout([]);
    setShareInfo([]);
    e.target.reset();
  };

  return (
    <div>
      <div className="bg-wrapper">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <main className="container">
        <Link to="/recipient-dashboard" className="back-btn">
          <i className="fa-solid fa-chevron-left"></i>
        </Link>

        <section className="hero">
          <div className="hero-content">
            <div className="hero-logo">
              <img src="/assets/logo.jpg" alt="Logo" />
            </div>

            <h1>Request Hair</h1>
            <p>
              Let's boost your confidence. Request hair to support your journey of comfort and
              self-expression.
            </p>

            <div className="guidelines-box">
              <div className="guidelines-title">
                <i className="fa-solid fa-ribbon"></i>
                <span>Request Guidelines</span>
              </div>

              <div className="guidelines-grid">
                <div className="guideline-column">
                  <div className="guideline-item">
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Prepare the following:</span>
                  </div>
                </div>

                <div className="guideline-column">
                  <div className="guideline-item">
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Wait for us to message you directly to coordinate other important details</span>
                  </div>

                  <div className="guideline-item">
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Fill up the wig request form</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="form-shell">
          <div className="form-card">
            <form id="requestHairForm" onSubmit={handleSubmit}>
              <div className="section-header">
                <i className="fa-solid fa-ribbon section-icon"></i>
                <h2>Request Details</h2>
              </div>

              <div className="form-grid two-col">
                <div className="form-group">
                  <label htmlFor="firstName">First Name <span>*</span></label>
                  <input type="text" id="firstName" name="firstName" required />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name <span>*</span></label>
                  <input type="text" id="lastName" name="lastName" required />
                </div>

                <div className="form-group">
                  <label htmlFor="hairType">Hair Type <span>*</span></label>
                  <div className="select-wrap">
                    <select id="hairType" name="hairType" required>
                      <option value="">Select Hair Type</option>
                      <option value="straight">Straight</option>
                      <option value="wavy">Wavy</option>
                      <option value="curly">Curly</option>
                    </select>
                    <div className="select-arrow">
                      <i className="fa-solid fa-chevron-down"></i>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="hairLength">Hair Length <span>*</span></label>
                  <input type="text" id="hairLength" name="hairLength" placeholder="e.g., 12 inches" required />
                </div>
              </div>

              <div className="divider"></div>

              <div className="section-title">
                <h2>Your Journey</h2>
              </div>

              <div className="journey-text">
                <label htmlFor="story"><strong>Please share with us your story/journey</strong> <span>*</span></label>
                <p>You may include the following information as your description:</p>
                <ul>
                  <li>Your diagnosis or condition</li>
                  <li>How hair loss has affected your life</li>
                  <li>Your goals and hopes for receiving hair</li>
                </ul>
              </div>

              <div className="form-group full-width">
                <textarea id="story" name="story" rows="7" required></textarea>
              </div>

              <div className="upload-block">
                <label>Upload supporting document/s here <span>*</span></label>
                <p>e.g. picture of medical certificate, doctor's diagnosis, or any proof that verifies the donee as a patient)</p>

                <div className="file-upload-row">
                  <input
                    type="file"
                    id="supportingDocs"
                    name="supportingDocs"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, 'supporting')}
                  />
                  <button
                    type="button"
                    className="upload-btn"
                    onClick={() => document.getElementById('supportingDocs').click()}
                  >
                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                    Add File
                  </button>
                  <span id="supportingDocsName" className="file-name">{supportingDocsName}</span>
                </div>
              </div>

              <div className="upload-block">
                <label>Additional Picture for reference <span>*</span></label>
                <p>You may upload photos of the patient to help us gain a clearer understanding of their condition.</p>

                <div className="file-upload-row">
                  <input
                    type="file"
                    id="referencePhoto"
                    name="referencePhoto"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, 'reference')}
                  />
                  <button
                    type="button"
                    className="upload-btn"
                    onClick={() => document.getElementById('referencePhoto').click()}
                  >
                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                    Add File
                  </button>
                  <span id="referencePhotoName" className="file-name">{referencePhotoName}</span>
                </div>
              </div>

              <div className="section-title hair-title">
                <h2>Hair Information</h2>
              </div>

              <div className="form-grid two-col short-grid">
                <div className="form-group">
                  <label htmlFor="hairColor">Hair Color <span>*</span></label>
                  <div className="select-wrap">
                    <select id="hairColor" name="hairColor" required>
                      <option value="">Select Color</option>
                      <option value="black">Black</option>
                      <option value="brown">Brown</option>
                      <option value="blonde">Blonde</option>
                    </select>
                    <div className="select-arrow">
                      <i className="fa-solid fa-chevron-down"></i>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="hairTexture">Hair Texture <span>*</span></label>
                  <div className="select-wrap">
                    <select id="hairTexture" name="hairTexture" required>
                      <option value="">Select Texture</option>
                      <option value="fine">Fine</option>
                      <option value="medium">Medium</option>
                      <option value="coarse">Coarse</option>
                    </select>
                    <div className="select-arrow">
                      <i className="fa-solid fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section-title survey-title">
                <h2>Survey</h2>
              </div>

              <div className="survey-grid">
                <div className="survey-column">
                  <h3>Where did you hear about us? <span>*</span></h3>
                  <div className="check-row">
                    <input
                      type="checkbox"
                      id="hear-facebook"
                      name="hearAbout"
                      value="facebook"
                      onChange={(e) => handleCheckboxChange(e, 'hearAbout')}
                    />
                    <label htmlFor="hear-facebook">Facebook</label>
                  </div>
                  <div className="check-row">
                    <input
                      type="checkbox"
                      id="hear-instagram"
                      name="hearAbout"
                      value="instagram"
                      onChange={(e) => handleCheckboxChange(e, 'hearAbout')}
                    />
                    <label htmlFor="hear-instagram">Instagram</label>
                  </div>
                  <div className="check-row">
                    <input
                      type="checkbox"
                      id="hear-friend"
                      name="hearAbout"
                      value="friend"
                      onChange={(e) => handleCheckboxChange(e, 'hearAbout')}
                    />
                    <label htmlFor="hear-friend">Friend/Family</label>
                  </div>
                  <div className="check-row other-inline">
                    <input
                      type="checkbox"
                      id="hear-other"
                      name="hearAbout"
                      value="other"
                      onChange={(e) => handleCheckboxChange(e, 'hearAbout')}
                    />
                    <label htmlFor="hear-other">Other:</label>
                    <input type="text" className="line-input" placeholder="Please specify" />
                  </div>
                </div>

                <div className="survey-column">
                  <h3>Consent to Share Information <span>*</span></h3>
                  <div className="survey-note">
                    <p>We may share your story (anonymously) to raise awareness and inspire others. Do you consent?</p>
                  </div>
                  <div className="check-row">
                    <input
                      type="checkbox"
                      id="share-yes"
                      name="shareInfo"
                      value="yes"
                      onChange={(e) => handleCheckboxChange(e, 'shareInfo')}
                    />
                    <label htmlFor="share-yes">Yes, I consent</label>
                  </div>
                  <div className="check-row">
                    <input
                      type="checkbox"
                      id="share-no"
                      name="shareInfo"
                      value="no"
                      onChange={(e) => handleCheckboxChange(e, 'shareInfo')}
                    />
                    <label htmlFor="share-no">No, I do not consent</label>
                  </div>
                </div>
              </div>

              <div className="submit-wrap">
                <button type="submit" className="submit-btn">
                  <i className="fa-solid fa-paper-plane"></i>
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
