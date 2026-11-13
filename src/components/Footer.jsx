import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" style={{ textDecoration: 'none' }} aria-label="Ottuner Home">
            <Logo variant="footer" />
          </Link>
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
            <li><a href="mailto:mvishnu471@gmail.com">mvishnu471@gmail.com</a></li>
            <li>India</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Ottuner</span>
        <span>Verified drivers. Real trust.</span>
      </div>
    </footer>
  );
}
