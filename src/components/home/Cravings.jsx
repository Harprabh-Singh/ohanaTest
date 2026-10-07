import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContent } from '../../content/ContentContext';
import { defaultPalate } from '../../content/defaults';
import { categoryBookMap, menuItems as defaultItems } from '../../data/menuData';
import { useInView, prefersReduced } from './useHome';

/* keep the home page in its warm world — swap any blue-ish tint for mint */
const warm = (hex) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || ''));
  if (!m) return hex;
  const n = parseInt(m[1], 16), r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  if (mx === mn) return hex;
  let h = mx === r ? (g - b) / (mx - mn) : mx === g ? 2 + (b - r) / (mx - mn) : 4 + (r - g) / (mx - mn);
  h = (h * 60 + 360) % 360;
  return h > 185 && h < 265 ? '#4FB28A' : hex;
};

/* "Pick a card" — the menu dealt as a hand of cards. Cards deal in from a
   stack, fan out on an arc and the chosen one rises. Drag, scroll sideways,
   use the arrow keys, tap a card — or hit Shuffle and let fate order. */
export default function Cravings() {
  const ctx = useContent();
  const navigate = useNavigate();
  const cats = useMemo(() => {
    const p = ctx?.content?.palate;
    return Array.isArray(p) && p.length ? p : defaultPalate;
  }, [ctx?.content]);
  const items = (ctx?.content?.menu?.items) || defaultItems;
  const stats = useMemo(() => cats.map((c) => {
    const list = items.filter((it) => it.category === c.categorySlug && Number(it.price) > 0);
    return { count: list.length, from: list.length ? Math.min(...list.map((it) => Number(it.price))) : null };
  }), [cats, items]);

  const N = cats.length;
  const root = useRef(null);
  const fan = useRef(null);
  const inView = useInView(root);
  const [active, setActive] = useState(Math.floor(N / 2));
  const [dealt, setDealt] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [settled, setSettled] = useState(false);
  const drag = useRef({ x: 0, on: false, moved: false, start: 0 });
  const wheelLock = useRef(0);

  useEffect(() => { if (inView && !dealt) setDealt(true); }, [inView, dealt]);
  useEffect(() => { if (!dealt) return; const t = setTimeout(() => setSettled(true), 70 * N + 900); return () => clearTimeout(t); }, [dealt, N]);

  const clamp = (i) => Math.max(0, Math.min(N - 1, i));
  const step = useCallback((d) => setActive((i) => clamp(i + d)), [N]);

  const urlFor = (c) => {
    const b = categoryBookMap[c.categorySlug] || { flip: 1, side: 'left' };
    return `/menu?flip=${b.flip}&side=${b.side}`;
  };

  /* slot-machine shuffle: fast flicks that slow down, then land */
  const shuffle = () => {
    if (shuffling) return;
    if (prefersReduced()) { setActive(Math.floor(Math.random() * N)); return; }
    setShuffling(true);
    const target = (active + 2 + Math.floor(Math.random() * (N - 2))) % N;
    let t = 0, k = 0;
    const flicks = 9;
    const tick = () => {
      k += 1;
      setActive(k === flicks ? target : Math.floor(Math.random() * N));
      if (k < flicks) { t = 60 + k * k * 9; setTimeout(tick, t); } else setTimeout(() => setShuffling(false), 500);
    };
    tick();
  };

  /* pointer drag across the fan */
  const onDown = (e) => { drag.current = { x: e.clientX, on: true, moved: false, start: active }; };
  const onMove = (e) => {
    const d = drag.current; if (!d.on) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 6) d.moved = true;
    const next = clamp(d.start - Math.round(dx / 90));
    if (next !== active) setActive(next);
  };
  const onUp = () => { drag.current.on = false; };
  const onWheel = (e) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 8) return;
    const now = performance.now(); if (now - wheelLock.current < 220) return;
    wheelLock.current = now; step(e.deltaX > 0 ? 1 : -1);
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    if (e.key === 'Enter') navigate(urlFor(cats[active]));
  };

  const cur = cats[active];
  const tint = warm(cur.color);

  return (
    <section ref={root} className={`theme-ember hc-root${dealt ? ' is-dealt' : ''}${settled ? ' is-settled' : ''}${shuffling ? ' is-shuffling' : ''}`} style={{ '--tint': tint }}>
      <div className="hc-glow" aria-hidden />
      <div className="h-wrap hc-top">
        <div className="hc-intro">
          <p className="h-eyebrow"><span className="h-dot" />The Palate</p>
          <h2 className="h-display">Pick a card,<br /><span className="hc-crave">any craving.</span></h2>
          <p className="hc-lede">Seven chapters of the menu, dealt like a hand. Drag the fan, tap a card — or let the deck decide.</p>
        </div>

        <div className="hc-detail" aria-live="polite">
          <div key={cur.key || active} className="hc-detail__in">
            <span className="hc-detail__sub">{String(active + 1).padStart(2, '0')} — {cur.sub}</span>
            <h3 className="hc-detail__title">{cur.title}</h3>
            <p className="hc-detail__copy">{cur.copy}</p>
            <div className="hc-detail__stats">
              {stats[active].count ? <span><b>{stats[active].count}</b> dishes</span> : null}
              {stats[active].from ? <span>from <b>₹{stats[active].from}</b></span> : null}
            </div>
          </div>
          <div className="hc-detail__ctas">
            <Link to={urlFor(cur)} className="hc-open">Open {cur.title} <span>→</span></Link>
            <button type="button" className="hc-shuffle" onClick={shuffle} disabled={shuffling}>
              <span className="hc-dice" aria-hidden><i /><i /><i /><i /><i /></span>
              {shuffling ? 'Shuffling…' : 'Shuffle'}
            </button>
          </div>
        </div>
      </div>

      <div ref={fan} className="hc-fan" tabIndex={0} role="listbox" aria-label="Menu categories — use arrow keys"
        aria-activedescendant={`hc-card-${active}`}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} onPointerCancel={onUp}
        onWheel={onWheel} onKeyDown={onKey}>
        <div className="hc-table" aria-hidden />
        {cats.map((c, i) => {
          const off = i - active;
          const hidden = Math.abs(off) > 4;
          const style = {
            '--off': off,
            '--abs': Math.abs(off),
            '--card': warm(c.color),
            '--deal': `${i * 70}ms`,
            zIndex: 50 - Math.abs(off),
            visibility: hidden ? 'hidden' : 'visible',
          };
          return (
            <button type="button" key={c.key || i} id={`hc-card-${i}`} role="option" aria-selected={i === active}
              className={`hc-card${i === active ? ' is-active' : ''}`} style={style} tabIndex={-1}
              onClick={() => { if (drag.current.moved) return; if (i === active) navigate(urlFor(c)); else setActive(i); }}>
              <span className="hc-card__face">
                <img src={c.image} alt="" loading="lazy" draggable="false" />
                <span className="hc-card__scrim" />
                <span className="hc-card__pip">{String(i + 1).padStart(2, '0')}</span>
                <span className="hc-card__suit" aria-hidden />
                <span className="hc-card__name">{c.title}</span>
                <span className="hc-card__hint">{i === active ? 'Tap to open →' : c.sub}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="h-wrap hc-foot">
        <button type="button" className="hc-arrow" onClick={() => step(-1)} disabled={active === 0} aria-label="Previous category">←</button>
        <div className="hc-dots">{cats.map((c, i) => <button type="button" key={i} className={i === active ? 'is-on' : ''} onClick={() => setActive(i)} aria-label={c.title} />)}</div>
        <button type="button" className="hc-arrow" onClick={() => step(1)} disabled={active === N - 1} aria-label="Next category">→</button>
      </div>
    </section>
  );
}
