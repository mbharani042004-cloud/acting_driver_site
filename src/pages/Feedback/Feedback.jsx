import { useState } from 'react';
import { Link } from 'react-router-dom';

const initialForm = {
  fullName: '',
  phone: '',
  driverName: '',
  bookingDate: '',
  driverBehavior: '',
  drivingQuality: '',
  punctuality: '',
  comments: '',
};

export default function Feedback() {
  const [formData, setFormData] = useState(initialForm);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};

    if (!formData.fullName.trim()) next.fullName = 'Please enter your full name.';
    if (!formData.phone.trim()) {
      next.phone = 'Please enter your phone number.';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      next.phone = 'Please enter a valid phone number.';
    }
    if (!formData.driverName.trim()) next.driverName = 'Please enter the driver name.';
    if (!formData.bookingDate) next.bookingDate = 'Please select the booking date.';
    if (!rating) next.rating = 'Please select an overall rating.';

    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const payload = { ...formData, rating };
    console.log(payload);

    setLoading(true);
    try {
      const { submitFeedback } = await import('../../services/submitToSheets');
      await submitFeedback(payload);
    } catch (err) {
      console.error('Feedback could not be sent:', err);
    } finally {
      setLoading(false);
    }

    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData(initialForm);
    setRating(0);
    setHovered(0);
    setErrors({});
    setSubmitted(false);
  };

  const fieldClass = (name) =>
    `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-navy transition-colors duration-150 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-navy/15 ${
      errors[name] ? 'border-red-500' : 'border-line focus:border-navy'
    }`;

  const labelClass = 'mb-1.5 block text-sm font-semibold text-navy';
  const errorClass = 'mt-1 block text-xs font-medium text-red-600';

  return (
    <div className="min-h-screen bg-surface px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-line-light bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:p-10">
          {submitted ? (
            <div className="py-8 text-center" role="status">
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-2xl text-white"
                aria-hidden="true"
              >
                ✓
              </div>
              <h1 className="mt-5 font-display text-2xl font-bold text-navy sm:text-3xl">
                Thank you for your feedback!
              </h1>
              <p className="mt-2 text-sm text-ink sm:text-base">
                Your feedback has been received successfully.
              </p>
              <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  Give another feedback
                </button>
                <Link
                  to="/reviews"
                  className="rounded-lg border border-line bg-white px-6 py-3 text-sm font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-navy hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  View client reviews
                </Link>
              </div>
            </div>
          ) : (
            <>
              <header className="mb-8 border-b border-line-light pb-6 text-center">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.5px] text-navy">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy" aria-hidden="true" />
                  Feedback
                </span>
                <h1 className="mt-3 font-display text-3xl font-bold text-navy">
                  Share Your Feedback
                </h1>
                <p className="mt-2 text-sm text-ink sm:text-base">
                  Tell us about your experience with our acting driver service.
                </p>
              </header>

              <form onSubmit={handleSubmit} noValidate>
                <fieldset className="mb-7">
                  <legend className="mb-4 font-display text-base font-bold uppercase tracking-wide text-navy">
                    Customer Information
                  </legend>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className={labelClass}>
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={fieldClass('fullName')}
                      />
                      {errors.fullName && (
                        <span className={errorClass}>{errors.fullName}</span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className={fieldClass('phone')}
                      />
                      {errors.phone && <span className={errorClass}>{errors.phone}</span>}
                    </div>

                    <div>
                      <label htmlFor="driverName" className={labelClass}>
                        Driver Name
                      </label>
                      <input
                        id="driverName"
                        name="driverName"
                        type="text"
                        placeholder="Driver who served you"
                        value={formData.driverName}
                        onChange={handleChange}
                        className={fieldClass('driverName')}
                      />
                      {errors.driverName && (
                        <span className={errorClass}>{errors.driverName}</span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="bookingDate" className={labelClass}>
                        Booking Date
                      </label>
                      <input
                        id="bookingDate"
                        name="bookingDate"
                        type="date"
                        value={formData.bookingDate}
                        onChange={handleChange}
                        className={fieldClass('bookingDate')}
                      />
                      {errors.bookingDate && (
                        <span className={errorClass}>{errors.bookingDate}</span>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="mb-7">
                  <legend className="mb-4 font-display text-base font-bold uppercase tracking-wide text-navy">
                    Overall Experience
                  </legend>

                  <div className="rounded-lg border border-line-light bg-surface px-4 py-5 text-center">
                    <div
                      className="flex justify-center gap-1"
                      role="group"
                      aria-label="Overall experience rating"
                    >
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = star <= (hovered || rating);
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => {
                              setRating(star);
                              setErrors((prev) => ({ ...prev, rating: '' }));
                            }}
                            onMouseEnter={() => setHovered(star)}
                            onMouseLeave={() => setHovered(0)}
                            aria-label={`Rate ${star} out of 5`}
                            className={`px-1 text-3xl leading-none transition-transform duration-150 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
                              active ? 'text-navy' : 'text-muted'
                            }`}
                          >
                            {active ? '★' : '☆'}
                          </button>
                        );
                      })}
                    </div>

                    {rating > 0 ? (
                      <p className="mt-3 text-sm font-semibold text-navy">
                        You rated us {rating} out of 5
                      </p>
                    ) : (
                      <p className="mt-3 text-sm text-muted">Tap a star to rate us</p>
                    )}
                    {errors.rating && (
                      <span className={errorClass}>{errors.rating}</span>
                    )}
                  </div>
                </fieldset>

                <fieldset className="mb-7">
                  <legend className="mb-4 font-display text-base font-bold uppercase tracking-wide text-navy">
                    Service Details
                  </legend>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="driverBehavior" className={labelClass}>
                        Driver Behavior
                      </label>
                      <select
                        id="driverBehavior"
                        name="driverBehavior"
                        value={formData.driverBehavior}
                        onChange={handleChange}
                        className={fieldClass('driverBehavior')}
                      >
                        <option value="">Select Driver Behavior</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Average">Average</option>
                        <option value="Poor">Poor</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="drivingQuality" className={labelClass}>
                        Driving Quality
                      </label>
                      <select
                        id="drivingQuality"
                        name="drivingQuality"
                        value={formData.drivingQuality}
                        onChange={handleChange}
                        className={fieldClass('drivingQuality')}
                      >
                        <option value="">Select Driving Quality</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Average">Average</option>
                        <option value="Poor">Poor</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="punctuality" className={labelClass}>
                        Punctuality
                      </label>
                      <select
                        id="punctuality"
                        name="punctuality"
                        value={formData.punctuality}
                        onChange={handleChange}
                        className={fieldClass('punctuality')}
                      >
                        <option value="">Select Punctuality</option>
                        <option value="On Time">On Time</option>
                        <option value="Slightly Late">Slightly Late</option>
                        <option value="Very Late">Very Late</option>
                      </select>
                    </div>
                  </div>
                </fieldset>

                <div className="mb-7">
                  <label htmlFor="comments" className={labelClass}>
                    Comments
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    rows="4"
                    placeholder="Tell us about your experience..."
                    value={formData.comments}
                    onChange={handleChange}
                    className={`${fieldClass('comments')} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-navy px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-dark hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-ink">
          <Link
            to="/"
            className="font-semibold text-navy underline-offset-4 transition-colors hover:underline"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
