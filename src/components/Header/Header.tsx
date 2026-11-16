import { useCallback, useEffect, useRef, useState } from 'react';
import Logo from '@/components/Logo/Logo';
import { getLenis } from '@/lib/motion';
import s from './Header.module.css';

const links = [
  { href: '#sobre', label: 'A Alva' },
  { href: '#cuidados', label: 'Cuidados' },
  { href: '#consulta', label: 'Primeira consulta' },
  { href: '#espaco', label: 'Espaço' },
  { href: '#duvidas', label: 'Dúvidas' },
];

const HERO_RATIO = 0.7;
const DIRECTION_THRESHOLD = 12;

const Arrow = () => (
  <span className="btn__arrow" aria-hidden="true">
    <svg viewBox="0 0 10 10">
      <path d="M0 5.6h7.6L4.1 9.1 5 10l5-5-5-5-.9.9 3.5 3.5H0z" fill="currentColor" />
    </svg>
  </span>
);

export default function Header() {
  const [pill, setPill] = useState(false); // past the hero: floating pill bar
  const [hidden, setHidden] = useState(false); // smart header: hidden while scrolling down
  const [open, setOpen] = useState(false); // mobile overlay

  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  /* ---------- Scroll: pill state + smart hide/show ---------- */
  useEffect(() => {
    let lastY = window.scrollY;
    let acc = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const inHero = y < window.innerHeight * HERO_RATIO;
      setPill(!inHero);

      const delta = y - lastY;
      lastY = y;
      acc = Math.sign(delta) === Math.sign(acc) ? acc + delta : delta;

      if (inHero) setHidden(false);
      else if (acc > DIRECTION_THRESHOLD) setHidden(true);
      else if (acc < -DIRECTION_THRESHOLD) setHidden(false);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* ---------- Mobile overlay ---------- */
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    const mq = window.matchMedia('(min-width: 960px)');
    const onMq = () => { if (mq.matches) close(); };
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
      document.body.style.overflow = prev;
      getLenis()?.start();
      toggleRef.current?.focus();
    };
  }, [open, close]);

  /* ---------- Sliding highlight (clip-path inset on a full-width layer) ---------- */
  const moveHighlight = useCallback((el: HTMLElement) => {
    const list = listRef.current;
    const hl = highlightRef.current;
    if (!list || !hl) return;
    const left = el.offsetLeft;
    const right = list.offsetWidth - left - el.offsetWidth;
    const clip = `inset(0 ${right}px 0 ${left}px round 999px)`;
    if (!placed.current) {
      // first placement: appear in place instead of sweeping in from the center
      hl.style.transition = 'none';
      hl.style.clipPath = clip;
      void hl.offsetWidth;
      hl.style.transition = '';
      placed.current = true;
    } else {
      hl.style.clipPath = clip;
    }
    hl.style.opacity = '1';
  }, []);
  const hideHighlight = useCallback(() => {
    if (highlightRef.current) highlightRef.current.style.opacity = '0';
  }, []);

  const light = pill && !open; // pill bar + dark-on-light tones
  const cls = [s.header, light ? s.pill : '', hidden && !open ? s.hidden : '', open ? s.open : ''].join(' ');

  return (
    <>
      <header className={cls} onFocus={() => setHidden(false)}>
        <div className={s.bar}>
          <a href="#inicio" className={s.brand} aria-label="Alva Odontologia, ir ao início">
            <span className={`${s.logoLayer} ${light ? s.logoOff : ''}`} aria-hidden="true">
              <Logo variant="mark" tone="on-teal" />
            </span>
            <span className={`${s.logoLayer} ${light ? '' : s.logoOff}`} aria-hidden="true">
              <Logo variant="mark" tone="on-light" />
            </span>
            <span className={s.logoSizer} aria-hidden="true"><Logo variant="mark" tone="on-teal" /></span>
          </a>

          <nav className={s.nav} aria-label="Principal">
            <ul
              role="list"
              ref={listRef}
              onPointerLeave={hideHighlight}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hideHighlight(); }}
            >
              <span className={s.highlight} ref={highlightRef} aria-hidden="true" />
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onPointerEnter={(e) => moveHighlight(e.currentTarget)}
                    onFocus={(e) => moveHighlight(e.currentTarget)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={s.end}>
            <a className={`btn ${s.cta}`} href="#agendar" data-magnetic="">
              Agendar avaliação <Arrow />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className={s.toggle}
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="visually-hidden">{open ? 'Fechar menu' : 'Abrir menu'}</span>
              <span className={s.lines} aria-hidden="true"><i /><i /></span>
            </button>
          </div>
        </div>
      </header>

      {/* Sibling of <header>: the header's transform would otherwise trap this fixed layer */}
      <div
        id="menu-mobile"
        className={`${s.menu} ${open ? s.menuOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        onClick={(e) => { if ((e.target as HTMLElement).closest('a')) { getLenis()?.start(); close(); } }}
      >
        <ul role="list" className={s.menuList}>
          {links.map((l, i) => (
            <li key={l.href} style={{ ['--i' as string]: i }}>
              <a href={l.href} ref={i === 0 ? firstLinkRef : undefined}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className={s.menuFoot}>
          <a className={`btn ${s.menuCta}`} href="#agendar" style={{ ['--i' as string]: links.length }}>
            Agendar avaliação <Arrow />
          </a>
          <p className={s.note} style={{ ['--i' as string]: links.length + 1 }}>
            Projeto fictício de portfólio · não realiza atendimentos
          </p>
        </div>
      </div>
    </>
  );
}
