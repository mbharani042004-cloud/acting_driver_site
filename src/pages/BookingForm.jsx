import { useState } from 'react';

const MAX_ADDRESS_WORDS = 100;
const countWords = (text) => (text.trim() ? text.trim().split(/\s+/).length : 0);

const INITIAL_FORM = {
  fullName: '', mobile: '', whatsapp: '', email: '',
  pickup: '', drop: '', pickupDate: '', pickupTime: '',
  tripType: '', subTripType: '', vehicleType: '', vehicleModel: '',
  transmission: [], driverRequired: '', otherDuration: '', returnDate: '', returnTime: '',
  notes: '', hp_field: '',
};

function generateWhatsAppBookingUrl(booking) {
  if (!booking) return 'https://wa.me/918508646426';
  const phone = '918508646426';
  const tripTypeFull = booking.subTripType
    ? `${booking.tripType} (${booking.subTripType})`
    : (booking.tripType || 'Standard');

  const durationFull = booking.driverRequired === 'Other' && booking.otherDuration
    ? booking.otherDuration
    : (booking.driverRequired || 'As requested');

  const lines = [
    `*🚗 New Driver Booking - Ottuner*`,
    ``,
    `*Customer Details:*`,
    `• *Name:* ${booking.fullName || 'Not provided'}`,
    `• *Mobile:* ${booking.mobile || 'Not provided'}`,
    booking.whatsapp ? `• *WhatsApp:* ${booking.whatsapp}` : null,
    booking.email ? `• *Email:* ${booking.email}` : null,
    ``,
    `*Trip Details:*`,
    `• *Trip Type:* ${tripTypeFull}`,
    `• *Pickup Address:* ${booking.pickup || 'Not provided'}`,
    booking.drop ? `• *Drop Address:* ${booking.drop}` : null,
    `• *Pickup Schedule:* ${booking.pickupDate || ''} at ${booking.pickupTime || ''}`,
    booking.returnDate ? `• *Return Schedule:* ${booking.returnDate} at ${booking.returnTime || ''}` : null,
    `• *Duration:* ${durationFull}`,
    ``,
    `*Vehicle Details:*`,
    booking.vehicleType ? `• *Vehicle Type:* ${booking.vehicleType}` : null,
    booking.vehicleModel ? `• *Vehicle Model:* ${booking.vehicleModel}` : null,
    booking.transmission && booking.transmission.length
      ? `• *Transmission:* ${Array.isArray(booking.transmission) ? booking.transmission.join(', ') : booking.transmission}`
      : null,
    booking.notes ? `\n*Notes:* ${booking.notes}` : null,
  ].filter(Boolean).join('\n');

  return `https://wa.me/${phone}?text=${encodeURIComponent(lines)}`;
}

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile' || name === 'whatsapp') {
      setForm((p) => ({ ...p, [name]: value.replace(/\D/g, '').slice(0, 10) }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const handleCheckbox = (e) => {
    const { name, value, checked } = e.target;
    setForm((p) => {
      const current = p[name] || [];
      return {
        ...p,
        [name]: checked ? [...current, value] : current.filter((v) => v !== value),
      };
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const words = value.trim() ? value.trim().split(/\s+/) : [];
    setForm((p) => ({
      ...p,
      [name]: words.length > MAX_ADDRESS_WORDS
        ? words.slice(0, MAX_ADDRESS_WORDS).join(' ')
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.transmission.length === 0) {
      alert('Please select a transmission type.');
      return;
    }
    const currentBooking = { ...form };
    const waUrl = generateWhatsAppBookingUrl(currentBooking);

    // Automatically trigger WhatsApp in new tab with the structured details
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch { }

    setLoading(true);
    try {
      const { submitBookingRequest } = await import('../services/submitToSheets');
      await submitBookingRequest(form);
    } catch { }
    setLoading(false);
    setConfirmedBooking(currentBooking);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setSubmitted(false);
  };

  return (
    <div className="form-page">
      <div className="form-wrapper">
        <div className="form-card">
          <div className="form-header">
            <h1>Book a Driver</h1>
            <p>Fill in your journey details and we will match you with the perfect driver</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Anti-bot honeypot */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <input
                type="text"
                name="hp_field"
                value={form.hp_field}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            {/* Section 1 */}
            <div className="form-section-label">
              <span className="num">1</span> Your Details
            </div>

            <div className="form-group">
              <label>Full Name <span className="req">*</span></label>
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Enter your full name" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mobile Number <span className="req">*</span></label>
                <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} required placeholder="10-digit mobile number" maxLength="10" pattern="[0-9]{10}" />
              </div>
              <div className="form-group">
                <label>WhatsApp Number</label>
                <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="WhatsApp number" maxLength="10" pattern="[0-9]{10}" />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@example.com (optional)" />
            </div>

            {/* Section 2 */}
            <div className="form-section-label">
              <span className="num">2</span> Journey Details
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Pickup Location <span className="req">*</span></label>
                <textarea name="pickup" value={form.pickup} onChange={handleAddressChange} required rows="2" placeholder="Address or landmark" />
                <span className="field-hint">{countWords(form.pickup)}/{MAX_ADDRESS_WORDS} words</span>
              </div>
              <div className="form-group">
                <label>Drop Location <span className="req">*</span></label>
                <textarea name="drop" value={form.drop} onChange={handleAddressChange} required rows="2" placeholder="Address or landmark" />
                <span className="field-hint">{countWords(form.drop)}/{MAX_ADDRESS_WORDS} words</span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Pickup Date <span className="req">*</span></label>
                <input type="date" name="pickupDate" value={form.pickupDate} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Pickup Time <span className="req">*</span></label>
                <input type="time" name="pickupTime" value={form.pickupTime} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Trip Type <span className="req">*</span></label>
              <div className="radio-group">
                {['One Way', 'Round Trip'].map((t) => (
                  <label key={t} className="radio-option">
                    <input type="radio" name="tripType" value={t} checked={form.tripType === t} onChange={handleChange} required />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            {form.tripType && (
              <div className="form-group" style={{ marginTop: '12px' }}>
                <div className="radio-group">
                  {['Local', 'Outstation'].map((st) => (
                    <label key={st} className="radio-option">
                      <input
                        type="radio"
                        name="subTripType"
                        value={st}
                        checked={form.subTripType === st}
                        onChange={handleChange}
                        required
                      />
                      {st}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {form.tripType === 'Round Trip' && (
              <div className="form-row">
                <div className="form-group">
                  <label>Return Date <span className="req">*</span></label>
                  <input type="date" name="returnDate" value={form.returnDate} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Return Time <span className="req">*</span></label>
                  <input type="time" name="returnTime" value={form.returnTime} onChange={handleChange} required />
                </div>
              </div>
            )}




            {/* Section 3 */}
            <div className="form-section-label">
              <span className="num">3</span> Vehicle Details
            </div>

            <div className="form-group">
              <label>Vehicle Type</label>
              <div className="radio-group">
                {['Hatchback', 'Sedan', 'SUV', 'Other'].map((v) => (
                  <label key={v} className="radio-option">
                    <input type="radio" name="vehicleType" value={v} checked={form.vehicleType === v} onChange={handleChange} />
                    {v}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Transmission <span className="req">*</span></label>
              <div className="checkbox-group">
                {['Manual', 'Automatic', 'Both'].map((t) => (
                  <label key={t} className="check-option">
                    <input
                      type="checkbox"
                      name="transmission"
                      value={t}
                      checked={form.transmission.includes(t)}
                      onChange={handleCheckbox}
                      required={form.transmission.length === 0}
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Vehicle Model</label>
              <input type="text" name="vehicleModel" value={form.vehicleModel} onChange={handleChange} placeholder="e.g. Maruti Swift" />
            </div>

            {/* Section 4 */}
            <div className="form-section-label">
              <span className="num">4</span> Driver Requirement
            </div>

            <div className="form-group">
              <label>Driver Required For <span className="req">*</span></label>
              <div className="radio-group">
                {['Minimum 4 Hours', 'Full Day', 'Other'].map((r) => (
                  <label key={r} className="radio-option">
                    <input type="radio" name="driverRequired" value={r} checked={form.driverRequired === r} onChange={handleChange} required />
                    {r}
                  </label>
                ))}
              </div>
            </div>

            {form.driverRequired === 'Other' && (
              <div className="form-group">
                <label>Specify Duration <span className="req">*</span></label>
                <input
                  type="text"
                  name="otherDuration"
                  value={form.otherDuration}
                  onChange={handleChange}
                  required
                  placeholder="How many hours, days, or weeks? (e.g. 6 hours, 3 days, 1 week)"
                />
              </div>
            )}

            <div className="form-group">
              <label>Special Requirements / Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Any special instructions, preferences, or notes for the driver..."
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
                {loading ? 'Submitting...' : 'Book a Driver'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {submitted && (
        <div className="modal-overlay" onClick={() => setSubmitted(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSubmitted(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="modal-success-icon">&#10003;</div>
            <h2>Booking Submitted!</h2>
            <p className="modal-desc">
              {confirmedBooking?.fullName ? `Thank you, ${confirmedBooking.fullName}! ` : ''}
              Our team will contact you shortly to confirm your driver details.
            </p>

            {confirmedBooking && (
              <div className="modal-summary">
                <div className="modal-summary-row">
                  <span className="modal-summary-label">Trip Type</span>
                  <span className="modal-summary-value">
                    {confirmedBooking.tripType} {confirmedBooking.subTripType ? `(${confirmedBooking.subTripType})` : ''}
                  </span>
                </div>
                <div className="modal-summary-row">
                  <span className="modal-summary-label">Pickup Schedule</span>
                  <span className="modal-summary-value">
                    {confirmedBooking.pickupDate} {confirmedBooking.pickupTime ? `at ${confirmedBooking.pickupTime}` : ''}
                  </span>
                </div>
                {confirmedBooking.mobile && (
                  <div className="modal-summary-row">
                    <span className="modal-summary-label">Mobile</span>
                    <span className="modal-summary-value">{confirmedBooking.mobile}</span>
                  </div>
                )}
                {confirmedBooking.driverRequired && (
                  <div className="modal-summary-row">
                    <span className="modal-summary-label">Duration</span>
                    <span className="modal-summary-value">
                      {confirmedBooking.driverRequired === 'Other' && confirmedBooking.otherDuration
                        ? confirmedBooking.otherDuration
                        : confirmedBooking.driverRequired}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="modal-actions">
              <a
                href={generateWhatsAppBookingUrl(confirmedBooking)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.89 12.04 8.01 12.2C8.13 12.37 9.72 14.82 12.16 15.87C12.74 16.12 13.19 16.27 13.55 16.38C14.13 16.56 14.67 16.54 15.08 16.48C15.55 16.41 16.51 15.9 16.71 15.33C16.92 14.76 16.92 14.27 16.86 14.17C16.8 14.07 16.63 14.01 16.38 13.88C16.13 13.76 14.91 13.16 14.68 13.08C14.46 13 14.3 12.96 14.13 13.21C13.97 13.46 13.5 14.01 13.36 14.17C13.22 14.34 13.08 14.36 12.83 14.23C12.58 14.11 11.78 13.85 10.83 13C10.09 12.34 9.6 11.53 9.45 11.28C9.31 11.03 9.44 10.9 9.56 10.77C9.67 10.66 9.81 10.48 9.94 10.33C10.07 10.18 10.11 10.07 10.19 9.91C10.27 9.74 10.23 9.6 10.17 9.48C10.11 9.35 9.62 8.14 9.41 7.64C9.21 7.15 9 7.22 8.85 7.21C8.71 7.21 8.54 7.21 8.37 7.21L8.53 7.33Z" />
                </svg>
                Send Booking via WhatsApp
              </a>
              <a href="/" className="btn btn-primary btn-lg">
                Back to Home
              </a>
              <button
                type="button"
                className="modal-secondary-btn"
                onClick={handleReset}
              >
                Book Another Driver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
