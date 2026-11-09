import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <>
      <section className="hero" style={{ padding: '64px 24px 72px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <div className="hero-label" style={{ justifyContent: 'center' }}>
            <span className="hero-label-dot" />
            Get in touch
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '16px' }}>
            Contact us
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            Questions, bookings, or agency inquiries. We are here.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Reach out</h3>
            <div className="info-row">
              <div className="info-row-icon">&#128222;</div>
              <div>
                <strong>Phone</strong>
                <a href="tel:8508646426">8508646426</a>
              </div>
            </div>
            <div className="info-row">
              <div className="info-row-icon">&#9993;</div>
              <div>
                <strong>Email</strong>
                <a href="mailto:mvishnu471@gmail.com">mvishnu471@gmail.com</a>
              </div>
            </div>
            <div className="info-row">
              <div className="info-row-icon">&#128205;</div>
              <div>
                <strong>Address</strong>
                <span>India</span>
              </div>
            </div>
            <div className="info-row">
              <div className="info-row-icon">&#128337;</div>
              <div>
                <strong>Hours</strong>
                <span>24 hours, 7 days a week</span>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <h3>Quick actions</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.7', fontSize: '0.95rem' }}>
              Book a driver for your next trip, or register as a driver to join our verified network.
            </p>
            <div className="contact-actions">
              <Link to="/booking-form" className="btn btn-primary btn-lg" style={{ justifyContent: 'center' }}>
                Book a driver
              </Link>
              <Link to="/agency-form" className="btn btn-outline btn-lg" style={{ justifyContent: 'center' }}>
                Driver register
              </Link>
              <a href="tel:8508646426" className="btn btn-outline btn-lg" style={{ justifyContent: 'center' }}>
                Call: 8508646426
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
