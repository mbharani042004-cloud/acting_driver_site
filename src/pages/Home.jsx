import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
    icon: '✈️',
    title: 'Airport Transfers',
    desc: 'Punctual drivers for early morning flights and late-night arrivals. We track your flight timing and adjust pickup accordingly.',
    image: '/service-airport.png',
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
    icon: '🛣️',
    title: 'Outstation Trips',
    desc: 'Intercity and long-distance travel with experienced highway drivers. Multi-day trips with overnight stay arrangements available.',
    image: '/service-outstation.png',
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
    icon: '🚗',
    title: 'Daily Commute',
    desc: 'Regular driver for your daily office commute or personal errands. Hire for a few hours or a full day.',
    image: '/service-airport-v2.png',
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
    icon: '🌙',
    title: 'Night Drives',
    desc: 'Late-night driving when you are tired, unwell, or simply want to get home safe. Available past midnight.',
    image: '/service-night.png',
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

function RouteSvg() {
  return (
    <div className="route-svg-wrap">
      <svg viewBox="0 0 500 380" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* White glow behind the line for contrast against car */}
        <path
          d="M80 310 C130 300 180 270 240 250 C300 230 370 230 440 220 L520 210"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.5"
          className="route-line"
        />
        {/* Route line */}
        <path
          d="M80 310 C130 300 180 270 240 250 C300 230 370 230 440 220 L520 210"
          className="route-line"
          strokeWidth="3.5"
        />
        {/* Pickup pin — near door handle, bottom-left */}
        <g className="route-pin">
          <circle cx="80" cy="310" r="10" fill="#000080" />
          <circle cx="80" cy="310" r="4" fill="white" />
          <rect x="44" y="278" width="72" height="22" rx="11" fill="white" opacity="0.9" />
          <text x="80" y="293" textAnchor="middle" className="route-label" fill="#000080" fontWeight="600" fontSize="11">Pickup</text>
        </g>
        {/* Drop pin — exits frame at right edge */}
        <g className="route-pin" style={{ animationDelay: '1.8s' }}>
          <circle cx="440" cy="220" r="10" fill="#000080" />
          <circle cx="440" cy="220" r="4" fill="white" />
          <rect x="404" y="188" width="72" height="22" rx="11" fill="white" opacity="0.9" />
          <text x="440" y="203" textAnchor="middle" className="route-label" fill="#000080" fontWeight="600" fontSize="11">Drop</text>
        </g>
      </svg>
    </div>
  );
}

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
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>
              A driver you can trust,<br />
              at your door
            </h1>
            <p className="hero-tamil" style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '20px', letterSpacing: '0.5px' }}>
              நம்பகமான ஓட்டுநர், உங்கள் வீட்டு வாசலில்
            </p>
            <p className="hero-desc">
              Book a verified professional driver for airport transfers,
              outstation trips, daily commutes, or late-night drives.
              Thoroughly vetted. Always punctual.
            </p>
            <div className="hero-actions">
              <Link to="/booking-form" className="btn btn-primary btn-lg">Book a driver</Link>
              <Link to="/agency-form" className="btn btn-outline btn-lg">Driver register</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-video-wrap">
              <video
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/Taxi_driver_waving_from_car_20260920162332.mp4" type="video/mp4" />
              </video>
              <div className="hero-video-overlay" />
              <div className="hero-video-route">
                <RouteSvg />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City Ticker */}
      <CityTicker />

      {/* Services */}
      <section className="section services-section">
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="section-header">
            <h2>What do you need today?</h2>
            <p>Select a service to see details, features, and what makes it different.</p>
          </div>
          <div className="services-tabs">
            {services.map((s) => (
              <button
                key={s.id}
                className={`services-tab ${activeTab === s.id ? 'active' : ''}`}
                onClick={() => setActiveTab(s.id)}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
          {active && (
            <div className="service-detail">
              <div className="service-detail-text">
                <h3>{active.title}</h3>
                <p>{active.desc}</p>
                <div className="service-features">
                  {active.features.map((f) => (
                    <div className="service-feature" key={f}>
                      <div className="service-feature-icon">&#10003;</div>
                      {f}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '28px' }}>
                  <Link to="/booking-form" className="btn btn-primary">Book now</Link>
                </div>
              </div>
              <div className="service-detail-visual">
                <img src={active.image} alt={active.title} className="service-visual-img" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Driver Packages */}
      <CustomPack />

      {/* Testimonials — Card Spread */}
      <section className="section" style={{ background: 'var(--surface)' }}>
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
