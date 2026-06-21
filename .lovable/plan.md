# KD Portfolio — Revised Implementation Plan

A premium, product-grade single-page experience for Kalana Dilshan, built on TanStack Start + React + TypeScript + Tailwind v4 + Framer Motion. The **KD waveform is promoted from a logo to the core of the design system** — it shapes dividers, the timeline, the scroll progress, loading sequence, and ambient motifs. Motion language targets Linear / Stripe / Raycast / Arc / Apple quality.

## Stack notes (unchanged)

- TanStack Start + Tailwind v4 (project default), Framer Motion, Lenis, lucide-react, cmdk, react-intersection-observer, react-countup, vaul (already present), Radix (already present).
- **PODIUM Sharp** is paid; I'll wire `--font-display` to a close free face (Boldonse / Archivo Black) via `<link>` in `__root.tsx`. Drop a licensed copy into `src/assets/fonts/` to swap.
- KD logo PNG → saved via `lovable-assets create` and imported as a JSON asset pointer.

## The Waveform Design System (new core concept)

A single SVG primitive `<Waveform />` powers every waveform appearance, with variant props so the motif feels intentional, not repeated.

```text
src/components/waveform/
  Waveform.tsx          // base SVG: configurable bars, gradient, amplitude curve
  WaveDivider.tsx       // horizontal section divider, fades to transparent at edges
  WaveformPath.tsx      // SVG <path> variant for the timeline spine + scroll progress
  WaveformPulse.tsx     // animated bars (research cards, loader, hover states)
  WaveformBackground.tsx// faint ambient pattern for select sections (low opacity)
```

Shared rules so it never feels overused:
- One **primary** waveform expression per section maximum (divider OR background, never both).
- Default opacity ≤ 12% for ambient uses, ≤ 40% for accents.
- Amplitude follows a symmetric easing curve mirroring the logo (peak at center, taper to edges).
- Gradient `accent-primary → accent-research` reused so the blue→teal of the logo is the recurring brand signal.

Waveform appears in:
- **Section dividers** (`WaveDivider` between sections — replaces hard breaks).
- **Scroll progress indicator** at top of viewport: a thin animated waveform stroke whose `pathLength` fills with scroll.
- **Loader** (see next section).
- **Timeline spine** (`WaveformPath` SVG, milestones snap to peaks/troughs).
- **Research cards** (animated pulse bars as data viz).
- **Hover state** on Project/Research cards (subtle waveform sweeps across the bottom border).
- **Hero accent** (faint waveform behind the headline, parallax on scroll).
- **Background pattern** on About + Contact only, very low opacity.

## Premium Loader (first-visit)

Component: `src/components/layout/Loader.tsx`. Plays once per session (`sessionStorage.kd-loaded`). Duration **1.7s** total, skippable by user interaction. Sequence (Framer Motion timeline):

1. 0.0s — solid `--background` panel mounts, blocks scroll.
2. 0.1s — `WaveformPulse` strokes draw from center outward (`pathLength` 0→1, staggered bars).
3. 0.7s — KD logo fades + scales in (0.96→1).
4. 1.1s — `Engineer. Build. Evolve.` words fade up, staggered.
5. 1.5s — panel `clip-path` wipes upward, revealing Hero; Lenis re-enables.

Respects `prefers-reduced-motion` → renders the end-state immediately and unmounts at 200ms.

## Hero — layered motion system

Five explicit layers, each with its own motion budget:

| Layer | Element | Motion |
|---|---|---|
| 1 | `<video>` background (CloudFront URL, autoplay/muted/loop/playsInline) | none |
| 2 | Noise texture (SVG turbulence as repeating PNG via `<utility bg-noise>`) | static |
| 3 | Animated grid (CSS mask + slow drift, ~40s loop) | continuous, low opacity |
| 4 | Waveform accents — faint `WaveformBackground` behind headline, slight parallax on scroll via `useScroll` + `useTransform` | parallax only |
| 5 | Content (eyebrow → headline → subheading → CTAs → stat row) | staggered fade-up on mount |

Hero KD wordmark / micro-logo gets a **subtle pulse every 6s** (scale 1→1.015→1, opacity 1→0.95→1, 1.2s ease) — not continuous, gated by IntersectionObserver so it only runs while Hero is on screen.

CTAs are magnetic buttons with a soft inner glow on hover.

## Section transitions & scroll storytelling

- `WaveDivider` between every major section pair, gradient-fading into both sides so sections feel continuous.
- Reusable `<Reveal>` wrapper using `whileInView` with a single shared easing (`[0.22, 1, 0.36, 1]`) and 60ms stagger — applied site-wide so every section breathes with the same rhythm.
- Lenis smooth scroll wired in a `use-lenis` hook from RootComponent; `data-lenis-prevent` on the command palette + modals.
- Scroll progress: a thin waveform stroke pinned to the top, `pathLength` driven by `useScroll().scrollYProgress`. Color uses the blue→teal gradient.
- Section-to-section parallax restraint: only the hero waveform, the About portrait frame, and the timeline spine move on scroll. Nothing else parallaxes.

## Project cards — premium interaction

`src/components/sections/projects/ProjectCard.tsx`

On hover (Framer Motion + CSS):
- Card scales to 1.02, `transition: spring(stiffness 220, damping 22)`.
- Border illuminates: `border-image` gradient (blue→teal) fades in at 60% opacity.
- A faint waveform sweeps across the bottom edge (path draw 0→1 on hover, reverse on leave).
- Background gains a layered radial spotlight that follows the cursor (`mouse-x` / `mouse-y` CSS vars, no React re-renders).
- Tech tags stagger upward 4px with 30ms delay each.
- GitHub icon translates 2px up-right + rotates 8deg.
- Cover image inside an `aspect-video` wrapper scales 1.04 with subtle clip-path reveal.

Filter chips (All / Full Stack / Backend / Mobile / Research) animate active state with a shared `layoutId` underline.

Detail view opens in the existing shadcn `Dialog` (already in repo) with sections: Overview, Challenges, Architecture, Tech, Links.

## Research section — distinct visual language

Visually separated from Projects so it reads as **engineering + research**, not more projects.

- Background tinted with `--accent-research` at 4% + a faint dot-grid pattern.
- Each `ResearchCard` is a wider, horizontal layout (image/visual left, copy right) — different shape from project cards.
- Each card features an animated `WaveformPulse` visualization whose bar heights are driven by a smooth pseudo-random sine (looped, paused when off-screen).
- Subtle SVG graph patterns (sparkline + grid) ghost behind the title.
- Tag chips use teal tone, not blue.
- Section heading reads "Research & Innovation" with a small "// Signal" eyebrow that reinforces the waveform metaphor.

## Timeline — waveform spine

`src/components/sections/experience/Timeline.tsx`

- Vertical timeline replaced by a single SVG `WaveformPath` running top→bottom (subtle horizontal oscillation, blue→teal gradient stroke).
- Each milestone (Education, Internship, Associate SWE, Future Goals) is anchored to a peak or trough of the path. A pulsing dot marks the node.
- As the user scrolls, the path **draws itself** via `pathLength` tied to `useScroll` of the section — looks like signal traveling through a wire.
- Milestone cards alternate left/right on desktop, single column on mobile; each reveals with fade-up + the dot expanding from 0.
- Future Goals milestone gets a dashed segment to indicate "in motion".

## Custom cursor system

`src/components/layout/CustomCursor.tsx` (dark mode only, disabled on touch + reduced-motion).

- Default: 8px ring that follows the pointer with spring smoothing (stiffness 180, damping 22). Soft outer glow on dark bg.
- Hover over `[data-cursor="project"]` → ring scales to 64px, label "View Project" fades in inside.
- `data-cursor="research"` → "View Research", teal tint.
- `data-cursor="contact"` → "Connect".
- `data-cursor="link"` → small arrow icon.
- Cursor is hidden by default (`cursor: none` on `html` when active); we fall back to native cursor instantly on `pointerleave` of the window or when touch is detected.

## Micro-interaction inventory (so every element has feedback)

- **Buttons**: magnetic attraction (`use-magnetic` hook), soft glow, 1px depth on press.
- **Nav links**: active section gets a shared-layout underline (`layoutId="nav-active"`), inactive links lift on hover.
- **Theme toggle**: sun/moon morphs via Framer's `motion.svg` path animation; background transitions colors over 400ms across the whole document (CSS `transition: background-color, color`).
- **Cards**: layered hover (border + glow + waveform sweep, see above).
- **Links**: directional arrow that translates on hover (`→` shifts right on text links, `↗` rotates on external).
- **Form fields**: label lifts on focus, border gains accent gradient on valid input.
- **Command palette**: fades + scales in, results animate with stagger, recent items pinned.

## Theme system

- Dark by default; `class="dark"` on `<html>` set by a `ScriptOnce` reading `localStorage.kd-theme` before paint to prevent FOUC.
- Full token set (background / surface / card / border / fg / muted-fg / accent-primary / accent-research / accent-achievement + `-hover` variants) declared as `oklch()` in `:root` and `.light` blocks of `src/styles.css`, registered in `@theme inline`.
- All transitions between themes use a single 350ms ease on `background-color`, `color`, `border-color`.

## Section contracts (data-driven)

| Section | Data file | Key motion |
|---|---|---|
| Hero | inline | 5-layer system + 6s pulse |
| About | inline + metrics | Two-column, counters, faint waveform bg |
| Services | `data/services.ts` | Bento grid, icon spring on hover |
| Projects | `data/projects.ts` | Filter chips with shared layout, premium card hover, modal |
| Research | `data/research.ts` | Horizontal cards, animated pulse viz, teal palette |
| Experience | `data/experience.ts` | Waveform-path timeline with scroll-drawn spine |
| Tech Stack | `data/techstack.ts` | Grouped grid, optional slow marquee row |
| Blog | `data/blog.ts` | 3 placeholder cards + Medium CTA |
| Contact | `data/socials.ts` + form | Validated form, success/error, magnetic submit |
| Footer | logo + socials | Minimal, with a final faint waveform divider above |

## Folder layout

```text
src/
  routes/
    __root.tsx          # head, font <link>, theme bootstrap ScriptOnce
    index.tsx           # composes all sections, page-level SEO/JSON-LD
  components/
    layout/             Navbar, MobileMenu, Footer, Loader, ScrollProgress, CommandPalette, ThemeToggle, CustomCursor
    waveform/           Waveform, WaveDivider, WaveformPath, WaveformPulse, WaveformBackground
    ui/                 MagneticButton, SectionHeading, Reveal, AnimatedCounter, TagChip, Badge ext.
    sections/
      hero/  about/  services/  projects/  research/  experience/  techstack/  blog/  contact/
  data/
    projects.ts services.ts experience.ts research.ts blog.ts socials.ts techstack.ts about.ts
  hooks/
    use-theme.ts use-lenis.ts use-active-section.ts use-magnetic.ts use-command-palette.ts
    use-cursor.ts use-mouse-position.ts use-session-flag.ts
  lib/
    motion.ts           # shared variants (fadeUp, stagger, scaleIn, draw)
    easings.ts          # canonical eases
  types/
    content.ts
  assets/
    kd-logo.png.asset.json
```

## SEO & head

- `src/routes/index.tsx` `head()`: title "Kalana Dilshan — Associate Software Engineer", description, og:title/description/type=website, og:url `/`, twitter:card=summary_large_image, canonical `/`, JSON-LD `Person` schema with `sameAs` from `data/socials.ts`.
- `__root.tsx`: viewport, charset, og:site_name, font `<link>`, theme bootstrap `ScriptOnce`.
- og:image deferred until you supply a share card (placeholder generic image worse than none).

## Accessibility & performance

- Semantic landmarks (`<header>`, `<main>`, `<section aria-labelledby>`, `<footer>`); single `<h1>` in Hero; icon-only buttons get `aria-label`.
- Keyboard-first: focus-visible ring using accent, Esc closes palette/menu/modal, focus trap inside them.
- **`prefers-reduced-motion`** is global: Loader collapses, custom cursor disables, parallax disables, all transitions drop to opacity-only with 0.15s duration.
- `h-dvh` (not `h-screen`) on hero. `loading="lazy"` on non-hero imagery, `aspect-*` wrappers to prevent CLS. Code-split CommandPalette + project modal via `React.lazy`.

## Build order

1. Install deps (`framer-motion`, `lenis`, `cmdk`, `react-intersection-observer`, `react-countup`); set design tokens, fonts, theme bootstrap.
2. Build `Waveform` primitive + variants (Divider / Path / Pulse / Background).
3. Layout shell: Navbar (with theme toggle, magnetic resume CTA), Footer, Loader, ScrollProgress (waveform stroke), CustomCursor, Lenis hook.
4. Author all `data/*.ts` placeholders with `// PLACEHOLDER` markers.
5. Sections in order: Hero (5-layer) → About → Services → Projects (cards + filters + modal) → Research (distinct viz) → Experience (waveform timeline) → TechStack → Blog → Contact.
6. CommandPalette + ⌘K shortcut.
7. SEO + JSON-LD; verify dark/light, mobile, reduced-motion; ensure build passes.

## Open assumptions (flag now if any are wrong)

- **Display font**: free PODIUM-Sharp-adjacent face unless you drop a licensed copy in `src/assets/fonts/`.
- **Contact form**: stubbed client-side; happy to wire to Lovable Cloud (email via Resend or DB inbox) in a follow-up.
- **Resume PDF**: placeholder `public/resume.pdf`; replace the file.
- **Hero video**: served directly from the CloudFront URL you provided.
- **Loader**: plays once per browser session (sessionStorage), not once ever (localStorage). Tell me if you want once-per-user instead.
