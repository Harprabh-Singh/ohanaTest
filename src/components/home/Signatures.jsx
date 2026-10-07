import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DISHES as DEFAULT_DISHES } from '../../data/houseFavourites';
import { useContent } from '../../content/ContentContext';
import { prefersReduced, isFinePointer, useMagnetic } from './useHome';

gsap.registerPlugin(ScrollTrigger);

function DishCard({ d, i }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (!isFinePointer() || prefersReduced()) return;
    const el = ref.current; const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${x * 100}%`); el.style.setProperty('--my', `${y * 100}%`);
    el.style.transform = `perspective(1100px) rotateY(${(x - 0.5) * 8}deg) rotateX(${(0.5 - y) * 8}deg)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <article ref={ref} className="hs-card" onMouseMove={onMove} onMouseLeave={onLeave} style={{ '--dish': d.accent || 'var(--accent)' }}>
      <div className="hs-card__media"><img className="hs-card__img" src={d.image} alt={d.name} loading="lazy" /></div>
      <div className="hs-card__shine" aria-hidden />
      <span className="hs-card__num" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
      <div className="hs-card__top">
        <span className="hs-chip">{d.tag}</span>
        <span className="hs-price"><small>₹</small>{d.price}</span>
      </div>
      <div className="hs-card__body">
        <p className="hs-card__short">{d.short}</p>
        <h3 className="hs-card__name">{d.name}</h3>
        <p className="hs-card__tag">{d.tagline} <span>{d.sub}</span></p>
      </div>
    </article>
  );
}

/* House favourites — a pinned horizontal rail on desktop, a swipeable
   snap rail on touch. Each photo drifts inside its frame as it travels. */
export default function Signatures() {
  const ctx = useContent();
  const dishes = Array.isArray(ctx?.content?.houseFavs) && ctx.content.houseFavs.length ? ctx.content.houseFavs : DEFAULT_DISHES;
  const root = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const [idx, setIdx] = useState(0);
  const magnet = useMagnetic(0.3);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const dist = () => Math.max(0, track.current.scrollWidth - window.innerWidth);
      const tween = gsap.to(track.current, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: root.current, start: 'top top', end: () => `+=${dist()}`,
          pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (s) => {
            if (bar.current) bar.current.style.transform = `scaleX(${s.progress})`;
            setIdx(Math.min(dishes.length - 1, Math.max(0, Math.round(s.progress * (dishes.length + 0.6) - 0.6))));
          },
        },
      });
      track.current.querySelectorAll('.hs-card').forEach((card) => {
        const img = card.querySelector('.hs-card__img');
        gsap.fromTo(img, { xPercent: -9, scale: 1.18 }, { xPercent: 9, scale: 1.18, ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
        gsap.fromTo(card.querySelector('.hs-card__num'), { xPercent: 40 }, { xPercent: -40, ease: 'none',
          scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
      });
      return () => {};
    });
    mm.add('(max-width: 900px)', () => {
      const el = track.current;
      const onScroll = () => {
        const p = el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth);
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
        setIdx(Math.min(dishes.length - 1, Math.round(p * (dishes.length - 1))));
      };
      el.addEventListener('scroll', onScroll, { passive: true });
      return () => el.removeEventListener('scroll', onScroll);
    });
    const late = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => { clearTimeout(late); mm.revert(); };
  }, [dishes.length]);

  return (
    <section ref={root} className="theme-dark hs-root">
      <div className="hs-mobile-head h-wrap">
        <p className="h-eyebrow"><span className="h-dot" />House favourites</p>
        <h2 className="h-display">The plates people <span className="h-accent">come back for.</span></h2>
      </div>
      <div ref={track} className="hs-track">
        <div className="hs-intro">
          <p className="h-eyebrow"><span className="h-dot" />House favourites</p>
          <h2 className="h-display">The plates<br />people<br /><span className="h-accent">come back for.</span></h2>
          <p className="hs-intro__copy">Six dishes our regulars order on repeat — from the tandoor-kissed pizza to the shake that needs two hands.</p>
          <span className="hs-hint">Keep scrolling <i>→</i></span>
        </div>
        {dishes.map((d, i) => <DishCard key={d.id ?? i} d={d} i={i} />)}
        <div className="hs-end">
          <p className="hs-end__kicker">Still hungry?</p>
          <Link ref={magnet} to="/menu" className="hs-orb"><span>Full<br />menu</span><i>→</i></Link>
        </div>
      </div>
      <div className="hs-hud h-wrap">
        <span className="hs-hud__count"><b>{String(idx + 1).padStart(2, '0')}</b> / {String(dishes.length).padStart(2, '0')}</span>
        <span className="hs-hud__name">{dishes[idx]?.name}</span>
        <span className="hs-hud__rail"><i ref={bar} /></span>
      </div>
    </section>
  );
}
