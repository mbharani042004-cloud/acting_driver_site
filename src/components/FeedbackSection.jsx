import { Link } from 'react-router-dom';

export default function FeedbackSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="feedback-cta-title">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-line-light bg-surface px-6 py-12 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(0,0,128,0.12)] sm:px-12 sm:py-14">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.5px] text-navy">
            <span className="h-1.5 w-1.5 rounded-full bg-navy" aria-hidden="true" />
            Feedback
          </span>

          <h2
            id="feedback-cta-title"
            className="mt-4 font-display text-3xl font-semibold text-navy sm:text-4xl"
          >
            Your Experience Matters
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink sm:text-lg">
            We value your feedback. Share your experience with our acting driver service
            and help us provide better service to every customer.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              to="/feedback"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-dark hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              Give Feedback
            </Link>
            <Link
              to="/reviews"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-7 py-3.5 text-sm font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-navy hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              Client Reviews
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
