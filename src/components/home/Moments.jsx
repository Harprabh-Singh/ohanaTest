import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContent } from '../../content/ContentContext';
import { defaultExperiences } from '../../content/defaults';
import { useInView, prefersReduced } from './useHome';

gsap.registerPlugin(ScrollTrigger);

/* The Ohana experience — an expanding accordion of moments.
   Hover (or tap) a panel to open it; idle, it plays like a slideshow. */
export default function Moments() {
  const c = useContent();
  const list = useMemo(() => {
    const e = c?.content?.experiences;
    return Array.isArray(e) && e.length ? e : defaultExperiences;
  }, [c?.content]);
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const inView = useInView(root);
  const reduced = prefersReduced();

  useEffect(() => {
    if (reduced) return;
    const g = gsap.context(() => {
      gsap.from('.hm-panel', { y: 80, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: '.hm-deck', start: 'top 85%', once: true } });
      gsap.from('.hm-head > *', { y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 75%', once: true } });
    }, root);
    return () => g.revert();
  }, [reduced]);

  const next = () => setActive((i) => (i + 1) % list.length);

  return (
    <section ref={root} className="theme-midnight hm-root">
      <div className="h-wrap">
        <header className="hm-head">
          <div>
            <p className="h-eyebrow"><span className="h-dot" />The Ohana experience</p>
            <h2 className="h-display">{list.length === 5 ? 'Five' : 'A few'} ways to<br /><span className="h-accent">spend an evening.</span></h2>
          </div>
          <div className="hm-head__side">
            <p>From the first espresso to the last light on the terrace — pick a mood.</p>
            <Link to="/gallery" className="h-btn h-btn--line">See the gallery <span>→</span></Link>
          </div>
        </header>

        <div className={`hm-deck${paused || !inView ? ' is-paused' : ''}`}
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {list.map((x, i) => {
            const [l1, l2] = String(x.title).split('\n');
            const on = i === active;
            return (
              <button type="button" key={x.id || i} className={`hm-panel${on ? ' is-on' : ''}`}
                onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                aria-expanded={on}>
                <img src={x.image} alt="" loading="lazy" />
                <span className="hm-panel__scrim" />
                <span className="hm-panel__id">{x.id}</span>
                <span className="hm-panel__spine">{String(x.title).replace('\n', ' ')}</span>
                <span className="hm-panel__body">
                  <span className="hm-chip">{x.tag}</span>
                  <span className="hm-panel__title">{l1}{l2 ? <><br />{l2}</> : null}</span>
                  <span className="hm-panel__desc">{x.description}</span>
                </span>
                {on && !reduced ? <span key={`p${active}`} className="hm-panel__progress" onAnimationEnd={next} /> : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
