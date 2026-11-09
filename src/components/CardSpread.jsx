import { useState, useCallback, useEffect } from 'react';
import './CardSpread.css';

function CardSpread({ cards }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const cycleNext = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % cards.length);
      setLeaving(false);
    }, 400);
  }, [leaving, cards.length]);

  const cyclePrev = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      setActiveIdx((prev) => (prev - 1 + cards.length) % cards.length);
      setLeaving(false);
    }, 400);
  }, [leaving, cards.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') cycleNext();
      if (e.key === 'ArrowLeft') cyclePrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [cycleNext, cyclePrev]);

  const getPos = (i) => {
    const diff = (i - activeIdx + cards.length) % cards.length;
    return diff <= 2 ? diff : cards.length - diff;
  };

  const renderCard = (card, i) => {
    const pos = getPos(i);
    if (pos > 2) return null;
    return (
      <div
        className={`card-stack__card ${leaving && pos === 0 ? 'stack-leave' : ''}`}
        data-pos={pos}
        key={i}
        onClick={pos === 0 ? cycleNext : undefined}
        style={{ cursor: pos === 0 ? 'pointer' : 'default' }}
      >
        <div className="card-stack__header">
          <span className="card-stack__trip-id">Trip #{1048 + i}</span>
          <span className="card-stack__status">Completed</span>
        </div>
        <div className="card-stack__route">
          <span className="card-stack__route-dot start" />
          <div className="card-stack__route-locations">
            <span>{card.from}</span>
            <span className="card-stack__route-dash" />
            <span>{card.to}</span>
          </div>
          <span className="card-stack__route-dot end" />
        </div>
        <p className="card-stack__quote">&ldquo;{card.quote}&rdquo;</p>
        <div className="card-stack__footer">
          <div className="card-stack__avatar">&#128100;</div>
          <div className="card-stack__driver-info">
            <span className="card-stack__driver-name">{card.driver}</span>
            <span className="card-stack__driver-meta">Ottunar verified &middot; {card.date}</span>
          </div>
          <div className="card-stack__rating">{card.rating}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="card-stack-wrapper">
      <div className="card-stack">
        {cards.map((card, i) => renderCard(card, i))}
      </div>
      <div className="card-stack__controls">
        <button className="card-stack__btn" onClick={cyclePrev} aria-label="Previous review">&#8592;</button>
        <div className="card-stack__dots">
          {cards.map((_, i) => (
            <button
              key={i}
              className={`card-stack__dot ${i === activeIdx ? 'active' : ''}`}
              onClick={() => { if (!leaving && i !== activeIdx) { setLeaving(true); setTimeout(() => { setActiveIdx(i); setLeaving(false); }, 400); } }}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
        <button className="card-stack__btn" onClick={cycleNext} aria-label="Next review">&#8594;</button>
      </div>
      <div className="card-stack__hint">Click or use arrows to browse reviews</div>
    </div>
  );
}

export default CardSpread;
