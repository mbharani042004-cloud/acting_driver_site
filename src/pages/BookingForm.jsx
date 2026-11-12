import { useState } from 'react';

const MAX_ADDRESS_WORDS = 100;
const countWords = (text) => (text.trim() ? text.trim().split(/\s+/).length : 0);

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '', mobile: '', whatsapp: '', email: '',
    pickup: '', drop: '', pickupDate: '', pickupTime: '',
    tripType: '', subTripType: '', foodFacility: '', stayFacility: '', vehicleType: '', vehicleModel: '',
    transmission: [], driverRequired: '', otherDuration: '', returnDate: '', returnTime: '',
    notes: '',
  });

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
    setLoading(true);
    try {
      const { submitBookingRequest } = await import('../services/submitToSheets');
      await submitBookingRequest(form);
    } catch { }
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-page">
        <div className="form-wrapper">
          <div className="form-card">
            <div className="success-view">
              <div className="success-icon">&#10003;</div>
              <h2>Booking Submitted!</h2>
              <p>Thank you for your booking request. Our team will contact you shortly to confirm your driver details.</p>
              <a href="/" className="btn btn-primary btn-lg">Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="form-wrapper">
        <div className="form-card">
          <div className="form-header">
            <h1>Book a Driver</h1>
            <p>Fill in your journey details and we will match you with the perfect driver</p>
          </div>

          <form onSubmit={handleSubmit}>
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

            {form.subTripType === 'Outstation' && (
              <div className="form-row">
                <div className="form-group">
                  <label>Food Facility <span className="req">*</span></label>
                  <input
                    type="text"
                    name="foodFacility"
                    value={form.foodFacility}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Provided by customer / Allowance"
                  />
                </div>
                <div className="form-group">
                  <label>Stay Facility <span className="req">*</span></label>
                  <input
                    type="text"
                    name="stayFacility"
                    value={form.stayFacility}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Hotel provided / Room arranged / Not applicable"
                  />
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
    </div>
  );
}
