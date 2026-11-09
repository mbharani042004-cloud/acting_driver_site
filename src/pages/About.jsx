import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <section style={{ padding: '72px 24px 56px', background: 'var(--paper)', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '16px', color: 'var(--text)' }}>
            About Ottuner
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', lineHeight: 1.8 }}>
            Everyone deserves a safe, professional driver when they need one.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="trust-grid" style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div>
            <div className="section-header">
              <h2>Why Ottuner exists</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.8 }}>
              Whether you are a senior citizen navigating city traffic, a business traveler
              arriving at the airport late at night, or a family heading out on a road trip —
              you need a driver you can trust. Ottuner connects you with verified professionals
              who show up on time, drive safely, and get you there.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              We work with both individual driving professionals and established agencies,
              giving you the widest selection of verified drivers across India.
            </p>
            <div className="verification-steps" style={{ marginTop: '32px' }}>
              <h3>What sets us apart</h3>
              <div className="step-list">
                <div className="step-item">
                  <div className="step-num" style={{ background: 'var(--verified)', borderColor: 'var(--verified)', color: 'white' }}>&#10003;</div>
                  <div className="step-text">
                    <h4>Rigorous driver verification</h4>
                    <p>Every driver passes license verification, background checks, and a skill assessment.</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-num" style={{ background: 'var(--verified)', borderColor: 'var(--verified)', color: 'white' }}>&#10003;</div>
                  <div className="step-text">
                    <h4>Real accountability</h4>
                    <p>Every trip is tracked. Ratings and reviews come from actual completed bookings.</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-num" style={{ background: 'var(--verified)', borderColor: 'var(--verified)', color: 'white' }}>&#10003;</div>
                  <div className="step-text">
                    <h4>24/7 availability</h4>
                    <p>Day or night, weekday or weekend — book whenever you need, including past midnight.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="driver-id-card" style={{ maxWidth: '100%' }}>
              <div className="driver-id-header">
                <div className="driver-avatar">&#128100;</div>
                <div className="driver-info">
                  <h4>Rajesh Kumar <span className="verified-badge">&#10003;</span></h4>
                  <p>Chennai</p>
                </div>
              </div>
              <div className="driver-stats">
                <div className="driver-stat">
                  <div className="driver-stat-num">5</div>
                  <div className="driver-stat-label">Years</div>
                </div>
                <div className="driver-stat">
                  <div className="driver-stat-num">1,240</div>
                  <div className="driver-stat-label">Trips</div>
                </div>
                <div className="driver-stat">
                  <div className="driver-stat-num">4.9</div>
                  <div className="driver-stat-label">Rating</div>
                </div>
              </div>
              <div className="driver-id-footer">
                <span>Ottuner verified driver</span>
                <span className="id-badge">OD-4821</span>
              </div>
            </div>
            <div className="driver-id-card" style={{ maxWidth: '100%', marginTop: '16px' }}>
              <div className="driver-id-header">
                <div className="driver-avatar">&#128100;</div>
                <div className="driver-info">
                  <h4>Suresh Murugan <span className="verified-badge">&#10003;</span></h4>
                  <p>Coimbatore</p>
                </div>
              </div>
              <div className="driver-stats">
                <div className="driver-stat">
                  <div className="driver-stat-num">6</div>
                  <div className="driver-stat-label">Years</div>
                </div>
                <div className="driver-stat">
                  <div className="driver-stat-num">890</div>
                  <div className="driver-stat-label">Trips</div>
                </div>
                <div className="driver-stat">
                  <div className="driver-stat-num">4.8</div>
                  <div className="driver-stat-label">Rating</div>
                </div>
              </div>
              <div className="driver-id-footer">
                <span>Ottuner verified driver</span>
                <span className="id-badge">OD-3297</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to book?</h2>
        <p>Verified drivers, available now.</p>
        <div className="cta-buttons">
          <Link to="/booking-form" className="btn btn-primary btn-lg">Book a driver</Link>
          <Link to="/contact" className="btn btn-ghost btn-lg">Contact us</Link>
        </div>
      </section>
    </>
  );
}
