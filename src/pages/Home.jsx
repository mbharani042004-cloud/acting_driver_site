import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import CardSpread from '../components/CardSpread';
import CustomPack from './CustomPack';
import FeedbackSection from '../components/FeedbackSection';

const cities = [
  'Chennai', 'Coimbatore', 'Salem', 'Madurai', 'Trichy',
  'Bangalore', 'Hyderabad', 'Mumbai', 'Pune', 'Delhi',
  'Kochi', 'Thiruvananthapuram', 'Vizag', 'Mysore', 'Tirupati'
];

const services = [
  {
    id: 'airport',
    label: 'Airport',
    title: 'Airport Transfers',
    desc: 'Punctual drivers for early morning flights and late-night arrivals. We track your flight timing and adjust pickup accordingly.',
    features: [
      'Flight timing aware pickup',
      'Meet & greet at arrivals',
      'Fixed pricing, no meter',
      'All major airports covered',
    ],
  },
  {
    id: 'outstation',
    label: 'Outstation',
    title: 'Outstation Trips',
    desc: 'Intercity and long-distance travel with experienced highway drivers. Multi-day trips with overnight stay arrangements available.',
    features: [
      'Highway-experienced drivers',
      'Multi-day trip support',
      'Flexible rest stops',
      'One-way & round-trip options',
    ],
  },
  {
    id: 'daily',
    label: 'Daily',
    title: 'Daily Commute',
    desc: 'Regular driver for your daily office commute or personal errands. Hire for a few hours or a full day.',
    features: [
      'Hourly or full-day booking',
      'Consistent assigned driver',
      'Flexible scheduling',
      'Perfect for errands & appointments',
    ],
  },
  {
    id: 'night',
    label: 'Night',
    title: 'Night Drives',
    desc: 'Late-night driving when you are tired, unwell, or simply want to get home safe. Available past midnight.',
    features: [
      'Available past midnight',
      'Safety-trained drivers',
      'Direct home drop',
      'No surge pricing at night',
    ],
  },
];

const testimonials = [
  {
    from: 'Adyar, Chennai',
    to: 'Chennai Airport',
    date: '14 Sep 2026',
    driver: 'Rajesh K.',
    rating: '4.9',
    quote: 'Rajesh arrived 15 minutes early. Car was clean, drive was smooth. I had a 6am flight and he made sure I was never worried about timing.',
  },
  {
    from: 'T Nagar, Chennai',
    to: ' Pondicherry',
    date: '8 Sep 2026',
    driver: 'Suresh M.',
    rating: '4.8',
    quote: 'Took my family on an outstation trip. Suresh knew every route, suggested good rest stops. Kids were comfortable the whole ride.',
  },
  {
    from: 'Anna Nagar',
    to: 'Velachery',
    date: '12 Sep 2026',
    driver: 'Vikram P.',
    rating: '4.9',
    quote: 'Booked a night driver after a late dinner party. Vikram was professional, careful, and got us home safely. Will book again.',
  },
];

function CityTicker() {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf;
    const speed = 0.5;
    const animate = () => {
      offsetRef.current -= speed;
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(offsetRef.current) >= halfWidth) {
        offsetRef.current = 0;
      }
      track.style.transform = `translateX(${offsetRef.current}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const renderSet = () => cities.map((city, i) => (
    <span className="ticker-item" key={i}>
      {city}
      <span className="ticker-dot" />
    </span>
  ));
  return (
    <div className="ticker-strip">
      <div className="ticker-track" ref={trackRef}>
        <div className="ticker-set">{renderSet()}</div>
        <div className="ticker-set">{renderSet()}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('airport');
  const active = services.find((s) => s.id === activeTab);

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* City Ticker */}
      <CityTicker />

      {/* Services */}
      <section className="services-section" id="services">
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="services-tabs">
            {services.map((s) => (
              <button
                key={s.id}
                className={`services-tab ${activeTab === s.id ? 'active' : ''}`}
                onClick={() => setActiveTab(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
          {active && (
            <div className="service-detail">
              <div className="service-detail-header">
                <div className="service-header-info">
                  <span className="service-category-pill">Verified Driver Service</span>
                  <h3 className="service-title">{active.title}</h3>
                  <p className="service-description">{active.desc}</p>
                </div>
                <div className="service-header-action">
                  <Link to="/booking-form" className="btn btn-primary btn-lg service-book-btn">
                    <span>Book now</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="service-features-grid">
                {active.features.map((f) => (
                  <div className="service-feature-card" key={f}>
                    <div className="service-feature-check">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EAA428" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="service-feature-text">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Driver Packages */}
      <CustomPack />

      {/* Testimonials — Card Spread */}
      <section className="testimonials-spread-section" style={{ background: 'var(--surface)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-header">
            <h2>What our customers say</h2>
            <p>Real trips, real people. Click or use arrows to browse reviews.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CardSpread cards={testimonials} />
          </div>
        </div>
      </section>

      {/* Feedback */}
      <FeedbackSection />

      {/* CTA */}
      <section className="cta-section">
        <h2>Need a driver today?</h2>
        <p>Call us or book online. Available 24/7 across India.</p>
        <div className="cta-phone">
          <a href="tel:8508646426">8508646426</a>
        </div>
        <div className="cta-buttons">
          <Link to="/booking-form" className="btn btn-ghost btn-lg" style={{ background: 'var(--paper)', color: 'var(--asphalt)' }}>Book a driver</Link>
          <Link to="/contact" className="btn btn-ghost btn-lg">Contact us</Link>
        </div>
      </section>
    </>
  );
}
