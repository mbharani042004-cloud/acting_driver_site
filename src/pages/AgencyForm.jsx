import { useState } from 'react';

export default function AgencyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '', mobile: '', email: '', city: '',
    experience: '', services: [], licence: null, about: '', terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox' && name === 'services') {
      setForm((p) => ({ ...p, services: checked ? [...p.services, value] : p.services.filter((s) => s !== value) }));
    } else if (type === 'checkbox') {
      setForm((p) => ({ ...p, [name]: checked }));
    } else if (type === 'file') {
      setForm((p) => ({ ...p, [name]: files[0] }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const handlePhone = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm((p) => ({ ...p, [e.target.name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { submitAgencyApplication } = await import('../services/submitToSheets');
      await submitAgencyApplication(form);
    } catch {}
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
              <h2>Application Submitted!</h2>
              <p>Thank you for applying. We will review your application and get back to you within 2-3 business days.</p>
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
            <div className="form-header-icon">&#128663;</div>
            <h1>Driver Registration</h1>
            <p>Join Ottunar as a verified professional driver</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Section 1 */}
            <div className="form-section-label">
              <span className="num">1</span> Personal Details
            </div>

            <div className="form-group">
              <label>Full Name <span className="req">*</span></label>
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Enter your full name" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mobile Number <span className="req">*</span></label>
                <input type="tel" name="mobile" value={form.mobile} onChange={handlePhone} required placeholder="10-digit mobile number" maxLength="10" pattern="[0-9]{10}" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@example.com (optional)" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City <span className="req">*</span></label>
                <input type="text" name="city" value={form.city} onChange={handleChange} required placeholder="City you operate in" />
              </div>
              <div className="form-group">
                <label>Years of Experience</label>
                <input type="number" name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 5" min="0" />
              </div>
            </div>

            {/* Section 2 */}
            <div className="form-section-label">
              <span className="num">2</span> Services &amp; Preferences
            </div>

            <div className="form-group">
              <label>Services You Can Offer <span className="req">*</span></label>
              <div className="checkbox-group">
                {['Airport Transfer', 'Outstation', 'Daily Commute', 'Night Drive', 'Hourly Hire'].map((s) => (
                  <label key={s} className="check-option">
                    <input type="checkbox" name="services" value={s} checked={form.services.includes(s)} onChange={handleChange} />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>About Yourself</label>
              <textarea name="about" value={form.about} onChange={handleChange} placeholder="Tell us about your driving experience, areas you cover, etc." rows="3" />
            </div>

            {/* Section 3 */}
            <div className="form-section-label">
              <span className="num">3</span> Driving Licence
            </div>

            <div className="form-group">
              <label>Upload Driving Licence <span className="req">*</span></label>
              <div className="file-upload-area">
                <input type="file" name="licence" onChange={handleChange} accept=".pdf,.jpg,.jpeg,.png" required />
                <div className="upload-icon">&#128196;</div>
                <p>{form.licence ? <span className="filename">{form.licence.name}</span> : 'Click to upload your driving licence (PDF, JPG, PNG)'}</p>
              </div>
            </div>

            <div className="terms-group">
              <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} required id="terms-driver" />
              <label htmlFor="terms-driver">
                I agree to the <a href="#">Terms &amp; Conditions</a> and confirm that all information provided is accurate. <span className="req">*</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading || !form.terms}>
                {loading ? 'Submitting...' : 'Register as Driver'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
