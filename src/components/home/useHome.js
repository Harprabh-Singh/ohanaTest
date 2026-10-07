import { useEffect, useRef, useState } from 'react';

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* true while the element is on screen */
export function useInView(ref, rootMargin = '0px') {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

/* Count a stat like "2K+", "4.8", "3yr" up from zero once visible */
export function useCountUp(value, active, duration = 1600) {
  const [out, setOut] = useState(prefersReduced() ? String(value) : String(value).replace(/[\d.]+/, '0'));
  const done = useRef(false);
  useEffect(() => {
    if (!active || done.current) return;
    const str = String(value);
    const m = str.match(/[\d.]+/);
    if (!m || prefersReduced()) { setOut(str); return; }
    done.current = true;
    const target = parseFloat(m[0]);
    const dec = (m[0].split('.')[1] || '').length;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - p, 4);
      setOut(str.replace(m[0], (target * e).toFixed(dec)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value, duration]);
  return out;
}

/* Magnetic hover: element drifts toward the pointer */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReduced()) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const leave = () => { el.style.transform = 'translate(0,0)'; };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, [strength]);
  return ref;
}
