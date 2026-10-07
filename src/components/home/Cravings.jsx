import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContent } from "../../content/ContentContext";
import { defaultPalate } from "../../content/defaults";
import { categoryBookMap, menuItems as defaultItems } from "../../data/menuData";
import { useInView, prefersReduced } from "./useHome";

/* Detect coarse/touch pointer (mobile) */
const isCoarsePointer = () =>
  typeof window !== "undefined" && window.matchMedia &&
  window.matchMedia("(pointer: coarse)").matches;

/* Swap blue-ish tints for warm mint on the home page */
const warm = (hex) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || ""));
  if (!m) return hex;
  const n = parseInt(m[1], 16), r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  if (mx === mn) return hex;
  let h = mx === r ? (g - b) / (mx - mn) : mx === g ? 2 + (b - r) / (mx - mn) : 4 + (r - g) / (mx - mn);
  h = (h * 60 + 360) % 360;
  return h > 185 && h < 265 ? "#4FB28A" : hex;
};

/* ── Spring physics engine ───────────────────────────────────────────────
   A critically-damped spring that runs in rAF.
   pos/vel are floats; onTick fires every frame during motion.          */
function createSpring({ stiffness = 260, damping = 30 } = {}) {
  let pos = 0, vel = 0, target = 0, raf = null, cb = null;
  const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };
  const step = () => {
    const f = (target - pos) * stiffness - vel * damping;
    vel += f / 60;
    pos += vel / 60;
    if (cb) cb(pos);
    if (Math.abs(target - pos) > 0.0005 || Math.abs(vel) > 0.0005) {
      raf = requestAnimationFrame(step);
    } else {
      pos = target; vel = 0;
      if (cb) cb(pos);
      raf = null;
    }
  };
  return {
    get pos() { return pos; },
    set pos(v) { pos = v; },
    get vel() { return vel; },
    set vel(v) { vel = v; },
    setTarget(t, immediate = false) {
      target = t;
      if (immediate) { pos = t; vel = 0; if (cb) cb(pos); stop(); return; }
      if (!raf) raf = requestAnimationFrame(step);
    },
    onTick(fn) { cb = fn; },
    stop,
  };
}

/* ── "Pick a card" card fan ──────────────────────────────────────────────
   The fan is driven by a *continuous float offset* via a spring — not a
   discrete integer index. All card transforms are written imperatively to
   DOM nodes via refs so React never re-renders during a drag or inertia
   animation, giving true 60 fps on mobile.                             */
export default function Cravings() {
  const ctx = useContent();
  const navigate = useNavigate();
  const cats = useMemo(() => {
    const p = ctx?.content?.palate;
    return Array.isArray(p) && p.length ? p : defaultPalate;
  }, [ctx?.content]);
  const items = ctx?.content?.menu?.items || defaultItems;
  const stats = useMemo(() => cats.map((c) => {
    const list = items.filter((it) => it.category === c.categorySlug && Number(it.price) > 0);
    return { count: list.length, from: list.length ? Math.min(...list.map((it) => Number(it.price))) : null };
  }), [cats, items]);

  const N = cats.length;
  const root = useRef(null);
  const fan = useRef(null);
  const cardRefs = useRef([]);           // direct DOM refs for imperative style writes
  const inView = useInView(root);

  /* React state — only for things React actually needs to re-render */
  const [active, setActive] = useState(Math.floor(N / 2));
  const [dealt, setDealt] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [settled, setSettled] = useState(false);

  /* Spring + drag live entirely outside React render */
  const spring = useRef(createSpring({ stiffness: 260, damping: 30 }));
  const offsetRef = useRef(Math.floor(N / 2));
  const drag = useRef({ x: 0, y: 0, on: false, moved: false, startOffset: 0, lastX: 0, velX: 0, lastT: 0 });
  const wheelLock = useRef(0);

  /* Deal in */
  useEffect(() => { if (inView && !dealt) setDealt(true); }, [inView, dealt]);
  useEffect(() => {
    if (!dealt) return;
    const init = Math.floor(N / 2);
    spring.current.setTarget(init, true);
    const t = setTimeout(() => setSettled(true), 70 * N + 900);
    return () => clearTimeout(t);
  }, [dealt, N]);

  /* Write card transforms directly to the DOM — zero React overhead.
     All values are continuously interpolated with a smooth-step activation
     curve so there are no hard jumps; the card glides up as it approaches
     center and back down as it moves away.                               */
  const applyOffset = useCallback((off) => {
    offsetRef.current = off;
    const STEP = 11; // deg per card slot

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const rel    = i - off;
      const absRel = Math.abs(rel);
      if (absRel > 5) { el.style.visibility = "hidden"; return; }
      el.style.visibility = "visible";
      el.style.zIndex = 50 - Math.round(absRel);

      /* Smooth-step activation: 1 when card is centered, 0 when 1+ slot away.
         t = clamp(1 - absRel, 0, 1)  → smooth-step: t²(3 - 2t)             */
      const t  = Math.max(0, Math.min(1, 1 - absRel));
      const act = t * t * (3 - 2 * t);   // 0 … 1, S-curve, no hard edges

      /* Fan rotation: continuous, no snapping */
      const rotDeg = rel * STEP;

      /* Lift: resting cards sit slightly low; active card floats up.
         lerp from +8px (pushed down at distance 1) to -26px (lifted at center) */
      const liftPx = 8 - act * 34;

      /* Scale: 0.84 at rest → 1.12 at center */
      const sc = 0.84 + act * 0.28;

      /* Opacity: 0.32 at distance 2+ → 1 at center */
      const opac = Math.max(0.32, 0.52 + act * 0.48);

      el.style.transform = `rotate(${rotDeg}deg) translateY(${liftPx}px) scale(${sc})`;
      el.style.opacity   = opac;

      /* Image zoom: zoomed out when active, zoomed in when background */
      const img = el.querySelector("img");
      if (img) {
        const imgSc = 1.12 - act * 0.12;      // 1.12 → 1.00 as card activates
        img.style.transform = `scale(${imgSc})`;
        img.style.opacity   = (0.58 + act * 0.42).toFixed(3);
      }

      /* Box-shadow depth increases smoothly toward active */
      const face = el.querySelector(".hc-card__face");
      if (face) {
        const card   = el.style.getPropertyValue("--card");
        const blur   = Math.round(14 + act * 46);          // 14 → 60px
        const spread = Math.round(36 + act * 24);          // 36 → 60px
        const ring   = act > 0.5 ? `, 0 0 0 2px ${card}` : ", 0 0 0 1px rgba(255,255,255,0.08)";
        face.style.boxShadow = `0 ${blur}px ${spread}px rgba(0,0,0,${(0.38 + act * 0.22).toFixed(2)})${ring}`;
      }
    });
  }, []);

  /* Wire spring callback once */
  useEffect(() => {
    const sp = spring.current;
    sp.onTick(applyOffset);
    return () => { sp.onTick(null); sp.stop(); };
  }, [applyOffset]);

  /* Snap to integer card and sync React active state */
  const snapTo = useCallback((idx, immediate = false) => {
    const clamped = Math.max(0, Math.min(N - 1, Math.round(idx)));
    spring.current.setTarget(clamped, immediate);
    setActive(clamped);
  }, [N]);

  const urlFor = (c) => {
    const b = categoryBookMap[c.categorySlug] || { flip: 1, side: "left" };
    return `/menu?flip=${b.flip}&side=${b.side}`;
  };

  /* ── Pointer drag — finger follows cards, spring + inertia on release ── */
  const onDown = (e) => {
    try { fan.current?.setPointerCapture(e.pointerId); } catch (_) {}
    spring.current.stop();
    drag.current = {
      x: e.clientX, y: e.clientY,
      on: true, moved: false,
      startOffset: offsetRef.current,
      lastX: e.clientX, velX: 0, lastT: performance.now(),
    };
  };

  const onMove = (e) => {
    const d = drag.current;
    if (!d.on) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    /* Abandon drag if vertical scroll intent is detected */
    if (!d.moved && Math.abs(dy) > Math.abs(dx) + 8) { d.on = false; return; }
    if (Math.abs(dx) > 8) d.moved = true;
    if (!d.moved) return;

    /* Track velocity for flick on release */
    const now = performance.now();
    const dt = Math.max(1, now - d.lastT);
    d.velX = (e.clientX - d.lastX) / dt;   // px / ms
    d.lastX = e.clientX;
    d.lastT = now;

    /* Map drag pixels → card index units */
    const pxPerCard = isCoarsePointer() ? 78 : 100;
    const raw = d.startOffset - dx / pxPerCard;

    /* Rubber-band resistance at both edges */
    const lo = 0, hi = N - 1;
    const banded = raw < lo
      ? lo - Math.sqrt(Math.abs(raw - lo)) * 0.38
      : raw > hi
        ? hi + Math.sqrt(Math.abs(raw - hi)) * 0.38
        : raw;

    /* Write to DOM directly — bypass React entirely */
    applyOffset(banded);
    spring.current.pos = banded;
  };

  const onUp = (e) => {
    const d = drag.current;
    if (!d.on) return;
    d.on = false;
    try { fan.current?.releasePointerCapture(e?.pointerId ?? 0); } catch (_) {}
    if (!d.moved) return;

    /* Seed spring with swipe velocity for natural momentum */
    const flickCards = -d.velX * 110;
    const rawTarget = offsetRef.current + flickCards;
    const target = Math.max(0, Math.min(N - 1, Math.round(rawTarget)));

    spring.current.pos = offsetRef.current;
    spring.current.vel = -d.velX * 4.5;
    snapTo(target);
  };

  /* ── Wheel ── */
  const onWheel = (e) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 8) return;
    const now = performance.now();
    if (now - wheelLock.current < 180) return;
    wheelLock.current = now;
    snapTo(Math.round(offsetRef.current) + (e.deltaX > 0 ? 1 : -1));
  };

  /* ── Keyboard ── */
  const onKey = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); snapTo(Math.round(offsetRef.current) + 1); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); snapTo(Math.round(offsetRef.current) - 1); }
    if (e.key === "Enter") navigate(urlFor(cats[active]));
  };

  /* ── Shuffle ── */
  const shuffle = () => {
    if (shuffling) return;
    if (prefersReduced()) { snapTo(Math.floor(Math.random() * N), true); return; }
    setShuffling(true);
    const target = (Math.round(offsetRef.current) + 2 + Math.floor(Math.random() * (N - 2))) % N;
    let k = 0;
    const flicks = 9;
    const tick = () => {
      k++;
      snapTo(k === flicks ? target : Math.floor(Math.random() * N));
      if (k < flicks) setTimeout(tick, 60 + k * k * 9);
      else setTimeout(() => setShuffling(false), 500);
    };
    tick();
  };

  const cur = cats[active];
  const tint = warm(cur.color);

  return (
    <section ref={root}
      className={`theme-ember hc-root${dealt ? " is-dealt" : ""}${settled ? " is-settled" : ""}${shuffling ? " is-shuffling" : ""}`}
      style={{ "--tint": tint }}>
      <div className="hc-glow" aria-hidden />
      <div className="h-wrap hc-top">
        <div className="hc-intro">
          <p className="h-eyebrow"><span className="h-dot" />The Palate</p>
          <h2 className="h-display">Pick a card,<br /><span className="hc-crave">any craving.</span></h2>
          <p className="hc-lede">Seven chapters of the menu, dealt like a hand. Drag the fan, tap a card — or let the deck decide.</p>
        </div>

        <div className="hc-detail" aria-live="polite">
          <div key={cur.key || active} className="hc-detail__in">
            <span className="hc-detail__sub">{String(active + 1).padStart(2, "0")} — {cur.sub}</span>
            <h3 className="hc-detail__title">{cur.title}</h3>
            <p className="hc-detail__copy">{cur.copy}</p>
            <div className="hc-detail__stats">
              {stats[active].count ? <span><b>{stats[active].count}</b> dishes</span> : null}
              {stats[active].from  ? <span>from <b>&#8377;{stats[active].from}</b></span> : null}
            </div>
          </div>
          <div className="hc-detail__ctas">
            <Link to={urlFor(cur)} className="hc-open">Open {cur.title} <span>&#8594;</span></Link>
            <button type="button" className="hc-shuffle" onClick={shuffle} disabled={shuffling}>
              <span className="hc-dice" aria-hidden><i /><i /><i /><i /><i /></span>
              {shuffling ? "Shuffling\u2026" : "Shuffle"}
            </button>
          </div>
        </div>
      </div>

      <div ref={fan} className="hc-fan" tabIndex={0} role="listbox"
        aria-label="Menu categories — use arrow keys"
        aria-activedescendant={`hc-card-${active}`}
        onPointerDown={onDown} onPointerMove={onMove}
        onPointerUp={onUp} onPointerLeave={onUp} onPointerCancel={onUp}
        onWheel={onWheel} onKeyDown={onKey}>
        <div className="hc-table" aria-hidden />
        {cats.map((c, i) => {
          const initOff = i - Math.floor(N / 2);
          return (
            <button type="button" key={c.key || i} id={`hc-card-${i}`}
              role="option" aria-selected={i === active}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`hc-card${i === active ? " is-active" : ""}`}
              style={{
                "--off": initOff,
                "--abs": Math.abs(initOff),
                "--card": warm(c.color),
                "--deal": `${i * 70}ms`,
                zIndex: 50 - Math.abs(initOff),
              }}
              tabIndex={-1}
              onClick={() => {
                if (drag.current.moved) return;
                if (i === active) navigate(urlFor(c));
                else snapTo(i);
              }}>
              <span className="hc-card__face">
                <img src={c.image} alt="" loading="lazy" draggable="false" />
                <span className="hc-card__scrim" />
                <span className="hc-card__pip">{String(i + 1).padStart(2, "0")}</span>
                <span className="hc-card__suit" aria-hidden />
                <span className="hc-card__name">{c.title}</span>
                <span className="hc-card__hint">{i === active ? "Tap to open \u2192" : c.sub}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="h-wrap hc-foot">
        <button type="button" className="hc-arrow"
          onClick={() => snapTo(Math.round(offsetRef.current) - 1)}
          disabled={active === 0} aria-label="Previous category">&#8592;</button>
        <div className="hc-dots">
          {cats.map((c, i) => (
            <button type="button" key={i}
              className={i === active ? "is-on" : ""}
              onClick={() => snapTo(i)}
              aria-label={c.title} />
          ))}
        </div>
        <button type="button" className="hc-arrow"
          onClick={() => snapTo(Math.round(offsetRef.current) + 1)}
          disabled={active === N - 1} aria-label="Next category">&#8594;</button>
      </div>
    </section>
  );
}
