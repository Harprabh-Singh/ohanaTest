import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReduced } from './useHome';

gsap.registerPlugin(ScrollTrigger);

const A = ['Wood-fired pizza', 'Tropical breakfasts', 'Terrace sunsets', 'Chunky shakes', 'Dragon wings', 'Slow-poured coffee'];
const B = ['Above Gar-Ali', 'Jorhat, Assam', 'Open daily 11 – 10', 'Santorini on a rooftop', 'Since 2022', '4.8★ on Google'];

const Half = ({ items }) => (
  <div className="hk-half">
    {[...items, ...items].map((t, i) => (
      <span key={i} className="hk-item">{t}<i className="hk-star" aria-hidden /></span>
    ))}
  </div>
);

/* Two crossing bands. They drift on their own and surge + lean with scroll speed. */
export default function Ticker() {
  const root = useRef(null);
  const t1 = useRef(null);
  const t2 = useRef(null);

  useEffect(() => {
    if (prefersReduced()) return;
    const a = gsap.fromTo(t1.current, { xPercent: 0 }, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
    const b = gsap.fromTo(t2.current, { xPercent: -50 }, { xPercent: 0, duration: 46, ease: 'none', repeat: -1 });
    const skew = gsap.quickTo([t1.current, t2.current], 'skewX', { duration: 0.5, ease: 'power3' });
    let settle;
    const st = ScrollTrigger.create({
      trigger: root.current, start: 'top bottom', end: 'bottom top',
      onToggle: (s) => { if (s.isActive) { a.play(); b.play(); } else { a.pause(); b.pause(); } },
      onUpdate: (s) => {
        const v = s.getVelocity();
        const boost = 1 + Math.min(Math.abs(v) / 260, 7);
        gsap.to([a, b], { timeScale: boost, duration: 0.2, overwrite: true });
        skew(gsap.utils.clamp(-10, 10, v / -140));
        clearTimeout(settle);
        settle = setTimeout(() => { gsap.to([a, b], { timeScale: 1, duration: 1.2, overwrite: true }); skew(0); }, 120);
      },
    });
    return () => { a.kill(); b.kill(); st.kill(); clearTimeout(settle); };
  }, []);

  return (
    <section ref={root} className="theme-dark hk-root" aria-label="Ohana at a glance">
      <div className="hk-band hk-band--gold">
        <div ref={t1} className="hk-track"><Half items={A} /><Half items={A} /></div>
      </div>
      <div className="hk-band hk-band--ink">
        <div ref={t2} className="hk-track"><Half items={B} /><Half items={B} /></div>
      </div>
    </section>
  );
}
