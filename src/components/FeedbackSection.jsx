import { Link } from 'react-router-dom';

export default function FeedbackSection() {
  return (
    <section className="px-4 pt-4 pb-16 sm:px-6 sm:pt-6 sm:pb-20" style={{ background: 'var(--surface)' }} aria-labelledby="feedback-cta-title">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-line-light bg-paper px-6 py-10 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(234,164,40,0.12)] sm:px-12 sm:py-12">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.5px] text-[#EAA428]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EAA428]" aria-hidden="true" />
            Feedback
          </span>

          <h2
            id="feedback-cta-title"
            className="mt-3 font-display text-3xl font-bold text-[#0F172A] sm:text-4xl"
          >
            Your Experience Matters
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-[#475569] sm:text-lg">
            We value your feedback. Share your experience with our acting driver service
            and help us provide better service to every customer.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              to="/feedback"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-[#EAA428] to-[#D89520] hover:from-[#F3B038] hover:to-[#E39F25] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-black shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Give Feedback
            </Link>
            <Link
              to="/reviews"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-7 py-3.5 text-sm font-semibold text-[#0F172A] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#EAA428] hover:text-[#EAA428] hover:shadow-sm"
            >
              Client Reviews
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
