import { useRef, useState, type KeyboardEvent } from 'react';
import Logo from '@/components/Logo/Logo';
import { gsap, ScrollTrigger, useGSAP, prefersReduced, finePointer, getLenis } from '@/lib/motion';
import s from './Hero.module.css';

type Who = 'adulto' | 'crianca';

const portraits: Record<Who, { src: string; alt: string; pos: string }> = {
  adulto: { src: '/images/mulher.webp', alt: 'Mulher de cabelos escuros sorrindo com tranquilidade', pos: '50% 30%' },
  crianca: { src: '/images/crianca.webp', alt: 'Menino de cabelos cacheados sorrindo para a câmera', pos: '50% 28%' },
};
const lines: Record<Who, string> = {
  adulto: 'você',
  crianca: 'os pequenos',
};

/** Replays [data-draw] svgs by toggling the runtime's data-inview flag across two frames. */
const redraw = (svgs: Element[]) => {
  svgs.forEach((m) => m.removeAttribute('data-inview'));
  requestAnimationFrame(() => requestAnimationFrame(() => svgs.forEach((m) => m.setAttribute('data-inview', ''))));
};

/**
 * The intro mark's signature beat (the petshop's "ears pop" equivalent): the extrusion
 * springs out from behind the letters while the smile swash draws underneath.
 */
function logoPop(tl: gsap.core.Timeline, logo: Element, at: gsap.Position) {
  const depth = logo.querySelectorAll('.logo__depth');
  const smile = logo.querySelectorAll<SVGPathElement>('.logo__smile path');
  const tag = logo.querySelector('.logo__tag');
  const d = parseFloat(getComputedStyle(logo).fontSize) * 0.085;
  smile.forEach((p) => { const len = p.getTotalLength(); gsap.set(p, { strokeDasharray: len, strokeDashoffset: len }); });
  tl.from(depth, { x: -d, y: d, duration: 0.5, ease: 'back.out(3)' }, at)
    .to(smile, { strokeDashoffset: 0, duration: 0.55, ease: 'power3.inOut', stagger: 0.04 }, '<0.06');
  if (tag) tl.from(tag, { opacity: 0, y: 6, duration: 0.4 }, '<0.2');
}

export default function Hero() {
  const [who, setWho] = useState<Who>('adulto');
  const root = useRef<HTMLElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLElement>(null);
  const switchRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const reduced = prefersReduced();
      const q = gsap.utils.selector(root);
      const mark = q('[data-hero-mark]')[0];
      const markInner = q('[data-hero-mark-inner]')[0];
      const arch = q('[data-hero-arch]')[0];
      const extras = q('[data-hero-extra]');
      const ui = q('[data-hero-ui]');
      const marks = q('[data-draw]');

      const firstVisit = !document.documentElement.classList.contains('intro-seen');
      if ((reduced || !firstVisit) && intro.current) intro.current.style.display = 'none';
      if (reduced) { redraw(marks); return; }

      /* ---------- Entrance (same choreography as the Bigode petshop) ----------
         1. teal screen: the logo rises in, its extrusion pops and the smile draws
         2. the screen wipes upward like a curtain
         3. underneath, the portrait settles in while the giant wordmark rises through a mask
         4. controls follow in a short stagger, the strokes draw */
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      gsap.set(markInner, { yPercent: 100, clipPath: 'inset(0% 0% 100% 0%)' });
      gsap.set(arch, { yPercent: 6, scale: 1.04, opacity: 0 });
      gsap.set(extras, { scale: 0.6, opacity: 0 });
      gsap.set(ui, { y: 30, opacity: 0 });

      if (firstVisit && intro.current) {
        try { sessionStorage.setItem('alva-intro', '1'); } catch { /* private mode */ }
        const ov = intro.current;
        const logo = ov.querySelector('.logo')!;
        tl.add(() => getLenis()?.stop());
        tl.from(logo, { yPercent: 40, opacity: 0, duration: 0.6 });
        logoPop(tl, logo, '<0.15');
        tl.to(ov, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'expo.inOut' }, '+=0.15')
          .add(() => { ov.style.display = 'none'; getLenis()?.start(); });
      }
      tl.to(arch, { yPercent: 0, scale: 1, opacity: 1, duration: 1.2 }, firstVisit ? '-=0.45' : 0)
        .to(markInner, { yPercent: 0, clipPath: 'inset(-20% -10% -30% -10%)', duration: 1 }, '<0.1')
        .to(ui, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, '<0.3')
        .to(extras, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.8)' }, '<0.1')
        .add(() => redraw(marks), '<');

      /* ---------- Scroll: the card settles back, the wordmark lifts away ---------- */
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to(q('[data-hero-card]'), { scale: 0.92, borderRadius: 64, ease: 'none', scrollTrigger: st });
      gsap.to(mark, { yPercent: -45, opacity: 0, ease: 'none', scrollTrigger: { ...st, end: '55% top' } });
      gsap.to(q('[data-hero-stage]'), { yPercent: 9, ease: 'none', scrollTrigger: st });
      ScrollTrigger.refresh();

      /* ---------- Pointer: gentle depth ---------- */
      if (finePointer()) {
        const ax = gsap.quickTo(q('[data-hero-stage]'), 'x', { duration: 1, ease: 'power3.out' });
        const mx = gsap.quickTo(mark, 'x', { duration: 1.2, ease: 'power3.out' });
        const my = gsap.quickTo(mark, 'y', { duration: 1.2, ease: 'power3.out' });
        const move = (e: PointerEvent) => {
          const nx = e.clientX / innerWidth - 0.5;
          const ny = e.clientY / innerHeight - 0.5;
          ax(nx * 16); mx(nx * -24); my(ny * -10);
        };
        const leave = () => { ax(0); mx(0); my(0); };
        const el = root.current!;
        el.addEventListener('pointermove', move, { passive: true });
        el.addEventListener('pointerleave', leave);
        return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
      }
    },
    { scope: root },
  );

  const select = contextSafe((to: Who) => {
    if (to === who) return;
    setWho(to);
    if (prefersReduced()) return;
    gsap.fromTo(word.current, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' });
    redraw(Array.from(root.current!.querySelectorAll('[data-draw]')));
  });

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const next: Who = who === 'adulto' ? 'crianca' : 'adulto';
    select(next);
    switchRef.current?.querySelector<HTMLButtonElement>(`[data-to="${next}"]`)?.focus();
  };

  return (
    <>
      <div className={s.intro} ref={intro} aria-hidden="true">
        <Logo className={s.intro__logo} />
      </div>

      <section className={s.hero} id="inicio" ref={root} aria-labelledby="hero-title">
        <div className={`${s.card} on-teal`} data-hero-card="">
          <h1 id="hero-title" className="visually-hidden">Alva Odontologia, clínica odontológica para toda a família</h1>

          <div className={s.mark} data-hero-mark="">
            <div data-hero-mark-inner="">
              <Logo variant="mark" className={s.mark__logo} />
            </div>
          </div>

          <div className={s.stage} data-hero-stage="">
            <div className={s.arch} data-hero-arch="" data-cursor="Olá!">
              {(Object.keys(portraits) as Who[]).map((k) => (
                <img
                  key={k}
                  className={`${s.portrait} ${who === k ? s.isActive : ''}`}
                  src={portraits[k].src}
                  alt={who === k ? portraits[k].alt : ''}
                  aria-hidden={who !== k}
                  width={784}
                  height={1168}
                  style={{ objectPosition: portraits[k].pos }}
                  fetchPriority={k === 'adulto' ? 'high' : 'low'}
                />
              ))}
            </div>

            {/* shine strokes beside the smile */}
            <svg className={s.shine} viewBox="0 0 120 120" fill="none" data-draw="" aria-hidden="true">
              <path d="M22 70 L46 58" stroke="var(--coral)" strokeWidth="7" strokeLinecap="round" />
              <path d="M30 40 L52 36" stroke="var(--coral)" strokeWidth="7" strokeLinecap="round" style={{ ['--i' as string]: 1 }} />
              <path d="M46 14 L58 24" stroke="var(--coral)" strokeWidth="7" strokeLinecap="round" style={{ ['--i' as string]: 2 }} />
            </svg>

            {/* rotating seal */}
            <div className={s.seal} data-hero-extra="" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs><path id="seal-ring" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" /></defs>
                <circle cx="60" cy="60" r="58" fill="var(--coral)" />
                <g className={s.seal__ring}>
                  <text><textPath href="#seal-ring" startOffset="0">ODONTOLOGIA · PARA TODA A FAMÍLIA ·</textPath></text>
                </g>
                <path d="M60 40 C 62 54, 66 58, 80 60 C 66 62, 62 66, 60 80 C 58 66, 54 62, 40 60 C 54 58, 58 54, 60 40 Z" fill="var(--ink)" />
              </svg>
            </div>

            {/* soft loop sketched behind the arch */}
            <svg className={s.loop} viewBox="0 0 160 120" fill="none" data-draw="" aria-hidden="true">
              <path d="M150 96 C 120 100, 92 88, 88 66 C 84 44, 112 40, 114 58 C 116 80, 74 92, 40 70 C 24 60, 16 44, 12 26"
                stroke="var(--cream)" strokeWidth="4" strokeLinecap="round" style={{ ['--i' as string]: 3 }} />
            </svg>
          </div>

          <div className={s.ui}>
            <a className={s.pill} href="#sobre" data-hero-ui="">
              <span>Odontologia com calma, escuta e precisão para <b ref={word}>{lines[who]}</b>.</span>
              <span className={s.pill__go} aria-hidden="true">
                <svg viewBox="0 0 10 10"><path d="M5.6 0v7.6l3.5-3.5L10 5l-5 5-5-5 .9-.9 3.5 3.5V0z" fill="currentColor" /></svg>
              </span>
            </a>

            <div className={s.switch} role="radiogroup" aria-label="Para quem é o cuidado" data-hero-ui=""
              data-active={who} ref={switchRef} onKeyDown={onKey}>
              <span className={s.switch__hl} aria-hidden="true" />
              <button type="button" role="radio" aria-checked={who === 'adulto'} tabIndex={who === 'adulto' ? 0 : -1}
                data-to="adulto" onClick={() => select('adulto')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
                </svg>
                Para você
              </button>
              <button type="button" role="radio" aria-checked={who === 'crianca'} tabIndex={who === 'crianca' ? 0 : -1}
                data-to="crianca" onClick={() => select('crianca')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 4c-2.5 0-4 2-4 5 0 4 1.5 11 4 11 1.8 0 1.6-5 5-5s3.2 5 5 5c2.5 0 4-7 4-11 0-3-1.5-5-4-5-2 0-3 1-5 1S9 4 7 4z" />
                  <path d="M17.5 1.5v3M16 3h3" />
                </svg>
                Para crianças
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
