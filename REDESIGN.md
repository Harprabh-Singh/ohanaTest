# Ohana — Apple-style visual redesign

Visual layer only. No animation code, timings, easings, ScrollTriggers, Lenis, Framer or SplitType logic was changed.

- **Type:** system stack (SF Pro on Apple devices, Inter elsewhere) via `--font-display` / `--font-text` / `--font-mono` in `src/index.css`. Display weight 700, tight negative tracking, eyebrow tracking reduced to 0.05–0.08em, italics removed.
- **Colour (v3 — "Aegean Ink & Porcelain"):** every colour is a CSS variable in `src/index.css`; three themes, switched per section by class.
  - Porcelain (default): #F7F3EC / sand #EFE7D9 / cards #FFFDF8, ink text #0B1424, accent Aegean cobalt #1D4ED8.
  - `.theme-dark` — Ink stages: #070B14 / #0D1424 / #121B30 with a cobalt aurora + candle-gold glow, ivory text #F7F3EC, accent saffron gold #E9B44C (ink text on gold buttons).
  - `.theme-cobalt` — Signature stages (home finale, gallery close, reservations call): cobalt #1A3BB0 with ivory text and gold accent.
  - Jewel-tone category palette (saffron, olive, terracotta, chilli, mustard, cobalt, plum).
- **Materials:** translucent nav bar + mobile sheet (`.material-bar`, `.material-sheet`) with `prefers-reduced-transparency` and `prefers-contrast` fallbacks. Pill buttons, hairline dividers, refined footer.
- **Imagery:** 21 new art-directed AVIFs in `public/images/` replace all stock hot-links and the old `/admin-images` set (placeholders — swap with real venue photography using the same file names). Per-menu-item stock thumbnails removed.
- **Content healing:** `ContentContext.jsx` swaps stale image URLs in old Cloudinary snapshots (Unsplash, /admin-images, png/jpg menu pages) for the bundled defaults; cache key bumped to v2.
- **Fix:** `vite.config.js` base is now `/` so `/menu/:category` loads on refresh.

## v4 — Home page "one dark world, four moods"
The home page now sits entirely on dark stages (matching the menu hero), each with its own contrast pairing:
- Hero, menu reel, house favourites, reviews — **Ink** `#070B14` + saffron gold `#E9B44C`, cobalt aurora glow.
- Palate carousel, Our Story — **Espresso ember** `#0E0907` + amber `#F0A04B`, ivory type.
- Ohana Experience — **Midnight** `#060D24` + champagne `#E8D3A2`.
- Finale — **Saffron gold inverse** `#E7B04A` with ink type and ink buttons.
- Nav bar is dark ink glass site-wide.
Themes: `.theme-dark`, `.theme-ember`, `.theme-midnight`, `.theme-gold`, `.theme-cobalt` in `src/index.css`.

## v5 — Reservations & Contact without blue
- All dark sections on Reservations and Contact use `.theme-dark.warm-glow`: ink `#0A0907` with a gold/terracotta aurora (no cobalt glow).
- Reservations: hero, interlude and ledger on warm ink; details on espresso ember; call-to-action on saffron gold.
- Contact: hero and map on warm ink; info and message on espresso ember; social on saffron gold.

## v6 — Home page "An evening at Ohana" (hero unchanged)
Everything after the hero was rebuilt in `src/components/home/` (styles in `home.css`; the v4 page is kept as `src/pages/Home.v4.jsx`). All sections still read from the /admin content store.
1. **Ticker** — two crossing marquee bands that speed up and lean with scroll velocity.
2. **Cravings** — a big type index of the menu; hover a line and the dish photo follows the cursor with inertia, the glow re-tints to the category; auto-cycles when idle; live dish counts and "from ₹" prices.
3. **Signatures** — house favourites as a pinned horizontal rail (desktop) with in-frame photo parallax, 3D tilt + light sheen, progress HUD and a magnetic "Full menu" orb; swipe/snap rail on touch.
4. **Story** — scroll-scrubbed manifesto (words light up), a photo window that expands from a rounded inset to full frame, counting stats, and a drawing timeline.
5. **Moments** — expanding accordion of the five experiences with auto-play progress; stacked accordion on mobile.
6. **Reviews** — 4.8 score with filling stars, one review at a time with word-by-word reveal, story-style progress segments, avatars, swipe and a quote ribbon.
7. **Finale** — live open/closed sign (Asia/Kolkata), magnetic CTAs, cursor spotlight, floating dishes with mouse + scroll parallax, inverting info tiles and a rising ink "Ohana" wordmark that meets the footer.
Respects `prefers-reduced-motion` (no pinning, scrubs or autoplay).

### v6.1 — Palate becomes "Pick a card, any craving"
The category list (too close to the hero menu index) is replaced by a fanned hand of cards: they deal in from a stack, fan on an arc, and the chosen card rises with a glow in its category colour. Drag, horizontal scroll, arrow keys, dots, or tap to choose; tap the raised card to open that menu chapter. A "Shuffle" button spins through cards slot-machine style and lands on a random craving. A detail panel shows the copy, live dish count and "from ₹" price.
