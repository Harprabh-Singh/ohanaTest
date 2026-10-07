import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReduced, isFinePointer, useMagnetic } from './useHome';

gsap.registerPlugin(ScrollTrigger);

const OPEN = 11 * 60, CLOSE = 22 * 60;
function useOpenStatus() {
  const calc = () => {
    try {
      const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
      const h = +parts.find((p) => p.type === 'hour').value, m = +parts.find((p) => p.type === 'minute').value;
      const t = h * 60 + m;
      if (t >= OPEN && t < CLOSE) {
        const left = CLOSE - t;
        return { open: true, text: left <= 60 ? `Open now · last orders in ${left} min` : 'Open now · until 10 PM' };
      }
      return { open: false, text: t < OPEN ? 'Closed · opens today at 11 AM' : 'Closed · opens tomorrow at 11 AM' };
    } catch { return { open: true, text: 'Open daily · 11 AM – 10 PM' }; }
  };
  const [s, setS] = useState(calc);
  useEffect(() => { const t = setInterval(() => setS(calc()), 60000); return () => clearInterval(t); }, []);
  return s;
}

const INFO = [
  { k: 'Find us', v: 'Above KFC, Gar-Ali', s: 'Jorhat, Assam', cta: 'Open in Maps', href: 'https://maps.google.com/?q=Ohana+Kitchen+Cafe+Jorhat' },
  { k: 'Hours', v: '11 AM – 10 PM', s: 'Every day of the week', cta: 'Walk-ins welcome', href: null },
  { k: 'Call or WhatsApp', v: 'Tap to connect', s: 'Fast replies, promise', cta: 'Message us', href: 'https://wa.me/919999999999' },
];

/* Finale — the warmest note. A live open/closed sign, magnetic CTAs,
   floating plates that respond to the cursor, and a wordmark that rises. */
export default function Finale() {
  const root = useRef(null);
  const status = useOpenStatus();
  const m1 = useMagnetic(0.35);
  const m2 = useMagnetic(0.25);

  useEffect(() => {
    const el = root.current;
    if (prefersReduced()) return;
    const g = gsap.context(() => {
      gsap.from('.hf-line > span', { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: '.hf-title', start: 'top 85%', once: true } });
      gsap.from('.hf-fade', { y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.25,
        scrollTrigger: { trigger: '.hf-title', start: 'top 85%', once: true } });
      gsap.from('.hf-tile', { y: 60, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: '.hf-tiles', start: 'top 90%', once: true } });
      gsap.utils.toArray('.hf-plate').forEach((p, k) => {
        gsap.fromTo(p, { y: 120 + k * 40 }, { y: -80 - k * 30, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    }, el);
    let raf;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--sx', `${x * 100}%`); el.style.setProperty('--sy', `${y * 100}%`);
        el.style.setProperty('--px', (x - 0.5).toFixed(3)); el.style.setProperty('--py', (y - 0.5).toFixed(3));
      });
    };
    if (isFinePointer()) el.addEventListener('mousemove', move);
    return () => { g.revert(); el.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section ref={root} className="theme-gold hf-root">
      <div className="hf-spot" aria-hidden />
      <div className="hf-plates" aria-hidden>
        <span className="hf-plate hf-plate--a" style={{ '--d': 38 }}><i className="hf-float"><img src="/showcase/pizza.avif" alt="" loading="lazy" /></i></span>
        <span className="hf-plate hf-plate--b" style={{ '--d': -26 }}><i className="hf-float"><img src="/showcase/burger.avif" alt="" loading="lazy" /></i></span>
        <span className="hf-plate hf-plate--c" style={{ '--d': 52 }}><i className="hf-float"><img src="/showcase/cake.avif" alt="" loading="lazy" /></i></span>
      </div>

      <div className="h-wrap hf-inner">
        <p className={`hf-status hf-fade${status.open ? ' is-open' : ''}`}><i />{status.text}</p>
        <h2 className="hf-title h-display">
          <span className="hf-line"><span>Your table</span></span>
          <span className="hf-line"><span>is <em>waiting.</em></span></span>
        </h2>
        <p className="hf-copy hf-fade">Climb the stairs above Gar-Ali, grab a seat on the terrace and let the kitchen take it from there.</p>
        <div className="hf-ctas hf-fade">
          <Link ref={m1} to="/reservations" className="hf-btn hf-btn--solid">Reserve a table <span>→</span></Link>
          <Link ref={m2} to="/contact" className="hf-btn hf-btn--ghost">Get directions</Link>
        </div>

        <div className="hf-tiles">
          {INFO.map((t) => {
            const Tag = t.href ? 'a' : 'div';
            return (
              <Tag key={t.k} className="hf-tile" {...(t.href ? { href: t.href, target: '_blank', rel: 'noreferrer' } : {})}>
                <span className="hf-tile__k">{t.k}</span>
                <span className="hf-tile__v">{t.v}</span>
                <span className="hf-tile__s">{t.s}</span>
                <span className="hf-tile__cta">{t.cta}{t.href ? ' →' : ''}</span>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
