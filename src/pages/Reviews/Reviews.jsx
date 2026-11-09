import { Link } from 'react-router-dom';

const reviews = [
  {
    name: 'Rahul Kumar',
    rating: 5,
    review:
      'Excellent service. The driver was very professional and arrived on time.',
    driver: 'Arun',
    date: '20 Sep 2026',
  },
  {
    name: 'Priya',
    rating: 4,
    review: 'Very comfortable journey. The driver was polite and helpful.',
    driver: 'Karthik',
    date: '18 Sep 2026',
  },
  {
    name: 'Vijay',
    rating: 5,
    review: 'Great experience. The driver was punctual and drove safely.',
    driver: 'Suresh',
    date: '15 Sep 2026',
  },
];

function Stars({ rating }) {
  return (
    <div
      className="flex gap-0.5 text-lg text-navy"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} aria-hidden="true" className={star <= rating ? '' : 'text-muted'}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <div className="min-h-screen bg-surface px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.5px] text-navy">
            <span className="h-1.5 w-1.5 rounded-full bg-navy" aria-hidden="true" />
            Client Reviews
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold text-navy sm:text-4xl">
            What Our Clients Say
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-ink">
            Read experiences shared by our customers.
          </p>
        </header>

        {/* Static summary */}
        <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-line-light bg-white px-6 py-7 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <p className="font-display text-4xl font-bold text-navy">4.8 / 5</p>
          <div
            className="mt-2 flex justify-center gap-1 text-xl text-navy"
            role="img"
            aria-label="4.8 out of 5 stars"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} aria-hidden="true">★</span>
            ))}
          </div>
          <p className="mt-2 text-sm text-ink">Based on customer experiences</p>
        </div>

        {/* Review cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-2xl border border-line-light bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:border-line hover:shadow-[0_12px_28px_rgba(0,0,128,0.10)]"
            >
              <Stars rating={item.rating} />

              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                &ldquo;{item.review}&rdquo;
              </p>

              <div className="mt-5 border-t border-line-light pt-4">
                <p className="text-sm font-bold text-navy">{item.name}</p>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-1 text-xs text-muted">
                  <span>Driver: {item.driver}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/feedback"
            className="inline-flex items-center justify-center rounded-lg bg-navy px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-dark hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            Give Feedback
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-line bg-white px-7 py-3.5 text-sm font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-navy hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
