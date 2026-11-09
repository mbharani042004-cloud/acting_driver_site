import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/ottunar-tamil-logo.png" alt="ஓட்டுநர்" className="footer-logo-img" />
          <p>Verified professional drivers, available around the clock. Airport transfers, outstation trips, daily commutes, and night drives across India.</p>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/booking-form">Book a driver</Link></li>
            <li><Link to="/agency-form">Driver register</Link></li>
            <li><Link to="/booking-form">Airport transfer</Link></li>
            <li><Link to="/booking-form">Outstation trips</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:8508646426">8508646426</a></li>
            <li>mvishnu4711@gmail.com</li>
            <li>India</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Ottunar</span>
        <span>Verified drivers. Real trust.</span>
      </div>
    </footer>
  );
}
