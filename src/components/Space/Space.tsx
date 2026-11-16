import { useRef } from 'react';
import SplitText from '@/components/motion/SplitText';
import { gsap, useGSAP, prefersReduced } from '@/lib/motion';
import s from './Space.module.css';

const notes = [
  { title: 'Luz natural', text: 'Janelas amplas e cores claras para a espera ser leve.' },
  { title: 'Sem pressa', text: 'Agenda com intervalos para você nunca se sentir apressado.' },
  { title: 'Para toda a família', text: 'Um canto pensado para as crianças chegarem tranquilas.' },
];

/**
 * The reception photo opens from a small tooth-arch window into a full-bleed view,
 * scrubbed by scroll while the section is pinned (sticky, CSS-only pinning).
 */
export default function Space() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      });
      tl.fromTo(q('[data-space-window]'),
        { clipPath: 'inset(14% 34% 14% 34% round 999px 999px 28px 28px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0px 0px)', duration: 1 })
        .fromTo(q('[data-space-img]'), { scale: 1.35 }, { scale: 1, duration: 1 }, 0)
        .fromTo(q('[data-space-intro]'), { opacity: 1, y: 0 }, { opacity: 0, y: -40, duration: 0.35 }, 0)
        .fromTo(q('[data-space-copy]'), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 }, 0.62)
        .fromTo(q('[data-space-note]'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.06 }, 0.72);
    },
    { scope: root },
  );

  return (
    <section className={s.space} id="espaco" ref={root} aria-labelledby="espaco-title">
      <div className={s.sticky}>
        <p className={s.intro} data-space-intro="" aria-hidden="true">Role para entrar</p>
        <div className={s.window} data-space-window="" data-cursor="Entre">
          <img
            className={s.img}
            data-space-img=""
            src="/images/espaco.webp"
            alt="Recepção da clínica com madeira clara, poltrona, plantas e luz natural entrando pelas janelas"
            width={1168}
            height={784}
            loading="lazy"
          />
          <div className={s.scrim} aria-hidden="true" />
          <div className={`${s.copy} on-teal`} data-space-copy="">
            <SplitText as="h2" id="espaco-title" className={`display ${s.title}`}>
              Um espaço feito para <em>respirar.</em>
            </SplitText>
            <ul className={s.notes} role="list">
              {notes.map((n) => (
                <li key={n.title} className={s.note} data-space-note="">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z" />
                  </svg>
                  <span><b>{n.title}</b>{n.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
