import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="navbar-logo" aria-label="Ottuner Home">
          <Logo variant="navbar" />
        </Link>
        <button className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          <li><Link to="/" className={isActive('/')} onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/about" className={isActive('/about')} onClick={() => setOpen(false)}>About</Link></li>
          <li><Link to="/contact" className={isActive('/contact')} onClick={() => setOpen(false)}>Contact</Link></li>
        </ul>
        <div className="nav-right">
          <Link to="/booking-form" className="nav-cta">Book a driver</Link>
          <Link to="/agency-form" className="nav-cta nav-cta--outline">Driver register</Link>
        </div>
      </div>
    </nav>
  );
}
