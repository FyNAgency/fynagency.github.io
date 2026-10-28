import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const has = (sel: string) => document.querySelector(sel) !== null;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esCO = (n: number, d = 0) => n.toLocaleString('es-CO', { minimumFractionDigits: d, maximumFractionDigits: d });

/* ---------- smooth scroll ---------- */
let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')!.replace(/^\//, '');
      const target = id.length > 1 ? document.querySelector(id) : null;
      if (!target) return;
      e.preventDefault();
      lenis?.start();
      lenis?.scrollTo(target as HTMLElement, { offset: -70 });
      history.replaceState(null, '', id);
    });
  });
  window.addEventListener('site-menu', (e) => {
    const open = (e as CustomEvent<{ open: boolean }>).detail.open;
    if (open) lenis?.stop();
    else lenis?.start();
  });
}

/* ---------- header: solid background once the page scrolls ---------- */
const header = document.querySelector<HTMLElement>('[data-header]');
if (header) {
  ScrollTrigger.create({
    start: 'top -40',
    onUpdate: (self) => {
      header.classList.toggle('is-scrolled', self.scroll() > 40);
    },
  });
}

/* ---------- counters (static numbers stay correct without JS) ---------- */
const countUp = (el: HTMLElement, opts: { start?: string; trigger?: Element; containerAnimation?: gsap.core.Animation } = {}) => {
  const end = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals ?? 0);
  const prefix = el.dataset.prefix ?? '';
  const suffix = el.dataset.suffix ?? '';
  const state = { v: 0 };
  gsap.to(state, {
    v: end,
    duration: 1.6,
    ease: 'power3.out',
    onUpdate: () => { el.textContent = prefix + esCO(state.v, decimals) + suffix; },
    scrollTrigger: {
      trigger: opts.trigger ?? el,
      start: opts.start ?? 'top 85%',
      containerAnimation: opts.containerAnimation,
      once: true,
    },
  });
};

if (!reduced) {
  /* ---------- hero entrance ---------- */
  const heroTitle = document.querySelector<HTMLElement>('[data-hero] h1');
  if (heroTitle) {
    const split = SplitText.create(heroTitle, { type: 'lines,words', mask: 'lines' });
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from(split.words, { yPercent: 110, duration: 1.1, stagger: 0.06 })
      .fromTo(heroTitle.querySelector('.hl'), { '--hl': 0 }, { '--hl': 1, duration: 0.8, ease: 'power2.inOut' }, '-=0.5')
      .from('[data-hero] [data-fade]', { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.35)
      .from('[data-hero] [data-tile]', { scale: 0, rotate: -90, duration: 0.7, stagger: { each: 0.05, from: 'random' }, ease: 'back.out(1.7)' }, 0.2);
    if (has('[data-hero] .disc')) tl.from('[data-hero] .disc', { scale: 0.4, opacity: 0, duration: 1 }, 0.3);
    if (has('[data-hero] .phone')) tl.from('[data-hero] .phone', { y: 120, rotate: 20, opacity: 0, duration: 0.9 }, 0.25);

    // the other two reels slide out from behind the main phone, one after the other
    const backLeft = document.querySelector('[data-slot="left"] .phone-back');
    const backRight = document.querySelector('[data-slot="right"] .phone-back');
    if (backLeft && backRight) {
      // each one starts as soon as the previous lands, with no pause in between
      tl.from(backLeft, { xPercent: 85, rotate: 4, scale: 0.8, opacity: 0, duration: 0.7, ease: 'back.out(1.4)' }, '>-0.25')
        .from(backRight, { xPercent: -85, rotate: 4, scale: 0.8, opacity: 0, duration: 0.7, ease: 'back.out(1.4)' }, '>-0.35');

      // gentle floating, each phone on its own rhythm
      [['main', 2.6, -12], ['left', 3.1, 14], ['right', 2.8, -16]].forEach(([slot, dur, y], i) => {
        gsap.to(`[data-slot="${slot}"]`, { y, duration: dur as number, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.4 + i * 0.2 });
      });

      // fan out further while the hero scrolls away
      const spread = { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: 1 };
      gsap.to('[data-slot="left"]', { x: -70, rotation: -8, ease: 'none', scrollTrigger: spread });
      gsap.to('[data-slot="right"]', { x: 70, rotation: 8, ease: 'none', scrollTrigger: spread });
    }

    // tiles keep turning while the hero scrolls away
    gsap.to('[data-hero] [data-tile]', {
      rotate: '+=90',
      ease: 'none',
      stagger: 0.02,
      scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: 1 },
    });
  }

  /* ---------- parallax ---------- */
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax);
    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  /* ---------- section titles ---------- */
  gsap.utils.toArray<HTMLElement>('main [data-split]').forEach((el) => {
    if (el.closest('[data-hero]')) return;
    const split = SplitText.create(el, { type: 'lines,words', mask: 'lines' });
    gsap.from(split.words, {
      yPercent: 110,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.05,
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });
  gsap.utils.toArray<HTMLElement>('main [data-fade]').forEach((el) => {
    if (el.closest('[data-hero]')) return;
    gsap.from(el, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });

  /* ---------- marquees: drift + speed up with scroll velocity ---------- */
  const bands = gsap.utils.toArray<HTMLElement>('[data-marquee]').map((band) => {
    const track = band.querySelector<HTMLElement>('.track')!;
    const dir = Number(band.dataset.marquee);
    const tween = gsap.fromTo(
      track,
      { xPercent: dir < 0 ? 0 : -50 },
      { xPercent: dir < 0 ? -50 : 0, duration: 28, ease: 'none', repeat: -1 },
    );
    return tween;
  });
  if (has('#marquee')) ScrollTrigger.create({
    trigger: '#marquee',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
      bands.forEach((t) =>
        gsap.to(t, {
          timeScale: boost,
          duration: 0.2,
          overwrite: true,
          onComplete: () => { gsap.to(t, { timeScale: 1, duration: 1.2, ease: 'power2.out' }); },
        }),
      );
    },
  });
  if (has('.band-yellow')) gsap.fromTo('.band-yellow', { rotate: -5 }, { rotate: 0, ease: 'none', scrollTrigger: { trigger: '#marquee', start: 'top bottom', end: 'bottom top', scrub: true } });
  if (has('.band-blue')) gsap.fromTo('.band-blue', { rotate: 5 }, { rotate: 0, ease: 'none', scrollTrigger: { trigger: '#marquee', start: 'top bottom', end: 'bottom top', scrub: true } });

  /* ---------- services rows ---------- */
  gsap.utils.toArray<HTMLElement>('[data-service]').forEach((row) => {
    gsap.from(row.querySelectorAll('.n, h3, p'), {
      y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: row, start: 'top 88%' },
    });
    gsap.from(row.querySelectorAll('[data-tile]'), {
      rotate: '-=180', scale: 0.3, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: row, start: 'top bottom', end: 'center 55%', scrub: 1 },
    });
  });

  /* ---------- numbers ---------- */
  gsap.utils.toArray<HTMLElement>('[data-cell]').forEach((cell, i) => {
    gsap.from(cell, { y: 80, rotate: i % 2 ? 3 : -3, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: cell, start: 'top 90%' } });
    gsap.to(cell.querySelector('.deco'), { rotate: 180, ease: 'none', scrollTrigger: { trigger: cell, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    const b = cell.querySelector<HTMLElement>('[data-count]');
    if (b) countUp(b, { trigger: cell });
  });

  /* ---------- packages and payment terms ---------- */
  gsap.utils.toArray<HTMLElement>('[data-package], [data-term]').forEach((card, i) => {
    gsap.from(card, { y: 70, rotate: i % 2 ? 2 : -2, opacity: 0, duration: 0.9, ease: 'power3.out', delay: (i % 3) * 0.08, scrollTrigger: { trigger: card, start: 'top 90%' } });
  });
  gsap.utils.toArray<HTMLElement>('[data-package] .shape').forEach((shape) => {
    gsap.to(shape, { rotate: 180, ease: 'none', scrollTrigger: { trigger: shape.closest('[data-package]'), start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });

  /* ---------- portfolio projects ---------- */
  gsap.utils.toArray<HTMLElement>('[data-project]').forEach((project) => {
    const panel = project.querySelector('.panel');
    if (panel) {
      gsap.from(panel, { scale: 0.6, rotate: project.classList.contains('flip') ? 6 : -6, ease: 'none', scrollTrigger: { trigger: project, start: 'top bottom', end: 'top 30%', scrub: 1 } });
    }
    project.querySelectorAll<HTMLElement>('[data-count]').forEach((n) => countUp(n, { trigger: project, start: 'top 55%' }));
  });

  /* ---------- process cards ---------- */
  gsap.utils.toArray<HTMLElement>('[data-step]').forEach((card) => {
    gsap.from(card.querySelector('.shape'), { rotate: -120, scale: 0.4, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 40%', scrub: 1 } });
  });

  /* ---------- Fabio block ---------- */
  if (has('[data-fabio]')) gsap.from('[data-fabio]', { clipPath: 'inset(12% 8% 12% 8% round 40px)', ease: 'none', scrollTrigger: { trigger: '[data-fabio]', start: 'top bottom', end: 'top 35%', scrub: 1 } });
  if (has('[data-fabio] .phone')) {
    // the video pops up big from below, then the stats stickers land around it
    gsap.timeline({ scrollTrigger: { trigger: '[data-fabio]', start: 'top 70%' } })
      .from('[data-fabio] .phone', { y: 260, rotate: -28, scale: 0.55, opacity: 0, duration: 1.2, ease: 'back.out(1.5)' })
      .from('[data-fabio] .sticker', { scale: 0, rotate: 30, duration: 0.6, ease: 'back.out(2)', stagger: 0.15 }, '-=0.45');
    gsap.to('[data-fabio] .phone', { rotate: 4, ease: 'none', scrollTrigger: { trigger: '[data-fabio]', start: 'top 40%', end: 'bottom top', scrub: 1 } });
  }
  if (has('[data-fabio]')) gsap.from('[data-fabio] [data-tile]', { scale: 0, rotate: 90, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '[data-fabio]', start: 'top 80%', end: 'top 30%', scrub: 1 } });

  /* ---------- contact orbit ---------- */
  if (has('[data-contact] .camera')) {
    gsap.from('[data-contact] .camera', { x: 220, rotate: 14, scale: 0.75, opacity: 0, duration: 1.2, ease: 'back.out(1.4)', scrollTrigger: { trigger: '[data-contact]', start: 'top 70%' } });
    gsap.to('[data-contact] .camera', { y: -40, ease: 'none', scrollTrigger: { trigger: '[data-contact]', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  }

  /* ---------- results reel: pinned; the first card is already there, the rest slide in from the right ---------- */
  const mm = gsap.matchMedia();
  mm.add({ wide: '(min-width: 901px)', narrow: '(max-width: 900px)' }, (ctx) => {
    const pin = document.querySelector<HTMLElement>('[data-reel-pin]');
    const track = document.querySelector<HTMLElement>('[data-reel-track]');
    const view = document.querySelector<HTMLElement>('[data-reel-viewport]');
    if (!pin || !track || !view) return;
    const { wide } = ctx.conditions as { wide: boolean };
    const start = wide ? 'center center' : 'top top';
    // how far the track moves so the last card ends fully inside the window
    const travel = () => Math.max(0, track.scrollWidth - view.clientWidth);
    const scrollFor = () => travel() * (wide ? 1 : 1.4);
    // after the last card arrives, keep the section fixed a little longer so it can be seen
    const hold = () => window.innerHeight * 0.45;

    ScrollTrigger.create({
      trigger: pin,
      start,
      end: () => '+=' + (scrollFor() + hold()),
      pin: true,
      invalidateOnRefresh: true,
    });
    const move = gsap.to(track, {
      x: () => -travel(),
      ease: 'none',
      scrollTrigger: { trigger: pin, start, end: () => '+=' + scrollFor(), scrub: 1, invalidateOnRefresh: true },
    });
    const cards = gsap.utils.toArray<HTMLElement>(track.querySelectorAll('.card'));
    // cards already inside the window when the section arrives (desktop: several, phone: just the first)
    const firstVisible = wide ? cards.filter((c) => c.offsetLeft < view.clientWidth) : cards.slice(0, 1);
    if (wide) {
      // they fly in from below-right and settle into place as the section reaches the screen
      gsap.from(firstVisible, {
        x: 260, y: 220, rotate: 18, scale: 0.7, opacity: 0,
        duration: 1.1, ease: 'back.out(1.3)', stagger: 0.14,
        scrollTrigger: { trigger: pin, start: 'top 80%' },
      });
    }
    cards.forEach((card) => {
      const n = card.querySelector<HTMLElement>('[data-count]');
      if (firstVisible.includes(card)) {
        if (n) countUp(n, { trigger: pin, start: 'top 70%' });
        return;
      }
      gsap.from(card, { rotate: 10, y: 70, scale: 0.85, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: move, start: 'left right', end: 'left 60%', scrub: true } });
      if (n) countUp(n, { trigger: card, containerAnimation: move, start: 'left 80%' });
    });
  });

  /* ---------- background color shifts per section ---------- */
  const tints: [string, string][] = [['#servicios', '#FFFFFF'], ['#resultados', '#FFF4D6'], ['#proceso', '#FFFFFF']];
  tints.forEach(([sel, color]) => {
    if (!has(sel)) return;
    ScrollTrigger.create({
      trigger: sel,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => { if (self.isActive) document.body.style.backgroundColor = color; },
      onLeaveBack: () => { document.body.style.backgroundColor = ''; },
    });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
}
