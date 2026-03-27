import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/haircare-dashboard.css';

export default function HairCareDashboard() {
  return (
    <main className="haircare-page">
      <Link to="/donor-dashboard" className="back-btn">
        ← Back to Dashboard
      </Link>

      <section className="hero">
        <h1>Hair Care Tips</h1>
        <p>Simple ways to keep your wig or hair healthy, beautiful, and long-lasting.</p>
      </section>

      <section className="tips-container">
        <div className="tip-card">
          <img src="/assets/wigbrushing.png" alt="brush hair" />
          <h3>Brush Gently Daily</h3>
          <p>
            Before and after wearing, use a wide-tooth comb or wig brush to remove tangles.
            Start from the ends and work your way up to avoid breakage.
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/XXjBStK2kLI?si=Ak1zA0P0fhufHSjd"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="tip-card">
          <img src="/assets/wigwashing.png" alt="wash hair" />
          <h3>Wash Properly (Not Too Often)</h3>
          <p>
            Wash your wig every 8–15 wears. Use wig-friendly shampoo and lukewarm water.
            Never wring or twist the fibers.
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/lC_8PjMpwCw?si=Zpb3BIYAV61_oGAC"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="tip-card">
          <img src="/assets/storewigs.png" alt="store wig" />
          <h3>Store to Preserve Shape</h3>
          <p>
            Place your wig on a stand when not in use. Keep it away from heat and humidity
            to maintain its natural look.
          </p>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Bz6WNGoSeOM?si=UpjAHyU_K58Rp1qN"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  );
}
