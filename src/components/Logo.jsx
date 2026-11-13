import logoImg from '../assets/logo.png';
import './Logo.css';

export default function Logo({ variant = 'navbar', className = '' }) {
  return (
    <div className={`brand-logo brand-logo--${variant} ${className}`}>
      <img src={logoImg} alt="Ottuner" className="brand-logo__emblem" />
      <span className="brand-logo__divider" aria-hidden="true" />
      <span className="brand-logo__wordmark">
        <span className="brand-logo__text">OTTUN</span>
        <span className="brand-logo__e" aria-hidden="true">
          <span className="brand-logo__bar" />
          <span className="brand-logo__bar" />
          <span className="brand-logo__bar" />
        </span>
        <span className="brand-logo__text">R</span>
      </span>
    </div>
  );
}

