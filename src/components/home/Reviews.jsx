import { useMemo, useRef, useState } from 'react';
import { useContent } from '../../content/ContentContext';
import { defaultReviews } from '../../content/defaults';
import { useInView, prefersReduced } from './useHome';

/* Guest reviews — one voice at a time, centre stage, with story-style
   progress segments. Swipe, click a segment, or let it play. */
export default function Reviews() {
  const c = useContent();
  const reviews = Array.isArray(c?.content?.reviews) && c.content.reviews.length ? c.content.reviews : defaultReviews;
  const root = useRef(null);
  const inView = useInView(root);
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const touch = useRef(0);
  const reduced = prefersReduced();
  const r = reviews[i % reviews.length];
  const go = (d) => setI((x) => (x + d + reviews.length) % reviews.length);
  const words = useMemo(() => String(r.quote).split(' '), [r]);
  const initials = (n) => String(n).split(' ').map((s) => s[0]).slice(0, 2).join('');

  return (
    <section ref={root} className={`theme-dark hr-root${inView ? ' is-in' : ''}`}>
      <div className="h-wrap hr-grid">
        <aside className="hr-score">
          <p className="h-eyebrow"><span className="h-dot" />Guest reviews</p>
          <p className="hr-big">4.8</p>
          <div className="hr-stars" aria-label="4.8 out of 5 stars"><span className="hr-stars__base">★★★★★</span><span className="hr-stars__fill">★★★★★</span></div>
          <p className="hr-meta">200+ verified visits · Google</p>
          <div className="hr-faces">
            {reviews.slice(0, 5).map((x, k) => (
              <button type="button" key={k} className={`hr-face${k === i % reviews.length ? ' is-on' : ''}`} onClick={() => setI(k)} aria-label={`Review by ${x.author}`}>{initials(x.author)}</button>
            ))}
            {reviews.length > 5 ? <span className="hr-face hr-face--more">+{reviews.length - 5}</span> : null}
          </div>
        </aside>

        <div className={`hr-stage${hold || !inView ? ' is-held' : ''}`}
          onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}
          onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); }}>
          <div className="hr-bars">
            {reviews.map((_, k) => (
              <button type="button" key={k} className={`hr-bar${k < i ? ' is-done' : ''}${k === i ? ' is-on' : ''}`} onClick={() => setI(k)} aria-label={`Show review ${k + 1}`}>
                {k === i && !reduced ? <i key={`b${i}`} onAnimationEnd={() => go(1)} /> : <i />}
              </button>
            ))}
          </div>
          <span className="hr-mark" aria-hidden>“</span>
          <blockquote key={i} className="hr-quote">
            {words.map((w, k) => <span key={k} style={{ animationDelay: `${Math.min(k * 22, 900)}ms` }}>{w} </span>)}
          </blockquote>
          <div key={`a${i}`} className="hr-author">
            <span className="hr-avatar">{initials(r.author)}</span>
            <span><b>{r.author}</b><em>{r.visit}</em></span>
            <span className="hr-rating">{'★'.repeat(r.rating || 5)}</span>
          </div>
          <div className="hr-nav">
            <button type="button" onClick={() => go(-1)} aria-label="Previous review">←</button>
            <span>{String(i + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => go(1)} aria-label="Next review">→</button>
          </div>
        </div>
      </div>

    </section>
  );
}
