import './WhatsAppButton.css';

export default function WhatsAppButton() {
  const phone = '918508646426';
  const defaultMessage = encodeURIComponent('Hello Ottuner, I would like to book a driver.');
  const whatsappUrl = `https://wa.me/${phone}?text=${defaultMessage}`;

  return (
    <aside aria-label="WhatsApp quick chat" className="whatsapp-floating-container">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Chat with Ottuner on WhatsApp"
      >
        <span className="whatsapp-tooltip">Chat with us</span>
        <div className="whatsapp-icon-wrapper">
          <svg
            className="whatsapp-svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.89 12.04 8.01 12.2C8.13 12.37 9.72 14.82 12.16 15.87C12.74 16.12 13.19 16.27 13.55 16.38C14.13 16.56 14.67 16.54 15.08 16.48C15.55 16.41 16.51 15.9 16.71 15.33C16.92 14.76 16.92 14.27 16.86 14.17C16.8 14.07 16.63 14.01 16.38 13.88C16.13 13.76 14.91 13.16 14.68 13.08C14.46 13 14.3 12.96 14.13 13.21C13.97 13.46 13.5 14.01 13.36 14.17C13.22 14.34 13.08 14.36 12.83 14.23C12.58 14.11 11.78 13.85 10.83 13C10.09 12.34 9.6 11.53 9.45 11.28C9.31 11.03 9.44 10.9 9.56 10.77C9.67 10.66 9.81 10.48 9.94 10.33C10.07 10.18 10.11 10.07 10.19 9.91C10.27 9.74 10.23 9.6 10.17 9.48C10.11 9.35 9.62 8.14 9.41 7.64C9.21 7.15 9 7.22 8.85 7.21C8.71 7.21 8.54 7.21 8.37 7.21L8.53 7.33Z" />
          </svg>
        </div>
      </a>
    </aside>
  );
}
