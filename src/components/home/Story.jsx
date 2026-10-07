import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../../content/ContentContext';
import { defaultStory } from '../../content/defaults';
import { useInView, useCountUp, prefersReduced } from './useHome';

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO = 'Ohana means *family.* In 2022 we opened a little terrace above Gar-Ali with one belief — good food should feel like coming *home.* Blue doors, golden-hour light, and a kitchen that cooks as if it were feeding its own.';

const MILESTONES = [
  { year: '2022', label: 'Founded', desc: 'Opened above Gar-Ali, Jorhat' },
  { year: '2023', label: 'Loved', desc: '1,000+ guests, 4.8★ average' },
  { year: '2024', label: 'Expanded', desc: 'New menu, bigger terrace' },
  { year: 'Now', label: 'Family', desc: '2K+ regulars and counting' },
];

const Stat = ({ value, label, on }) => {
  const v = useCountUp(value, on);
  return <div className="hy-stat"><b>{v}</b><span>{label}</span></div>;
};

export default function Story() {
  const c = useContent();
  const story = c?.content?.story || defaultStory;
  const root = useRef(null);
  const frame = useRef(null);
  const statsRef = useRef(null);
  const statsOn = useInView(statsRef);

  useEffect(() => {
    if (prefersReduced()) return;
    const g = gsap.context(() => {
      gsap.fromTo('.hy-word', { opacity: 0.12 }, { opacity: 1, ease: 'none', stagger: 0.12,
        scrollTrigger: { trigger: '.hy-manifesto', start: 'top 78%', end: 'bottom 42%', scrub: true } });
      gsap.fromTo(frame.current, { clipPath: 'inset(10% 24% 10% 24% round 44px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'none',
          scrollTrigger: { trigger: frame.current, start: 'top 90%', end: 'center 55%', scrub: true } });
      gsap.fromTo('.hy-frame img', { scale: 1.3 }, { scale: 1, ease: 'none',
        scrollTrigger: { trigger: frame.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo('.hy-line i', { scaleX: 0 }, { scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: '.hy-time', start: 'top 85%', end: 'top 45%', scrub: true } });
      gsap.from('.hy-node', { y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.12,
        scrollTrigger: { trigger: '.hy-time', start: 'top 80%', once: true } });
    }, root);
    return () => g.revert();
  }, []);

  const words = MANIFESTO.split(' ').map((w, i) => {
    const hot = w.startsWith('*');
    return <span key={i} className={`hy-word${hot ? ' is-hot' : ''}`}>{w.replace(/\*/g, '')} </span>;
  });

  return (
    <section ref={root} className="theme-ember hy-root">
      <div className="h-wrap">
        <p className="h-eyebrow"><span className="h-dot" />Our story</p>
        <p className="hy-manifesto">{words}</p>
      </div>

      <div className="hy-stage h-wrap">
        <div ref={frame} className="hy-frame">
          <img src="/images/interior.avif" alt="Inside Ohana" loading="lazy" />
          <div className="hy-frame__scrim" />
          <blockquote className="hy-quote">“Every plate we serve carries that warmth.”<cite>— The Ohana kitchen</cite></blockquote>
          <div ref={statsRef} className="hy-stats">
            <Stat value={story.guests} label="Guests hosted" on={statsOn} />
            <Stat value={`${story.rating}★`} label="Google rating" on={statsOn} />
            <Stat value={story.years} label="In Jorhat" on={statsOn} />
          </div>
        </div>
      </div>

      <div className="hy-time h-wrap">
        <div className="hy-line" aria-hidden><i /></div>
        {MILESTONES.map((m) => (
          <div key={m.year} className="hy-node">
            <span className="hy-node__dot" />
            <b>{m.year}</b>
            <strong>{m.label}</strong>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>
      <div className="h-wrap hy-cta"><Link to="/about" className="h-btn h-btn--line">Read our story <span>→</span></Link></div>
    </section>
  );
}
