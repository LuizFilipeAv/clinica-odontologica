import { useRef, type ReactNode } from 'react';
import SplitText from '@/components/motion/SplitText';
import { gsap, useGSAP, prefersReduced } from '@/lib/motion';
import styles from './Journey.module.css';

const iconProps = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

/* Steps sit at the vertical centre of four equal rows: 12.5, 37.5, 62.5, 87.5 (% of the thread). */
const THRESHOLDS = [0.125, 0.375, 0.625, 0.875];

const DESKTOP_PATH =
  'M50 0L50 12.5C58 16 42 34 50 37.5C58 41 42 59 50 62.5C58 66 42 84 50 87.5L50 100';
const MOBILE_PATH =
  'M50 0L50 12.5C80 17 20 33 50 37.5C80 42 20 58 50 62.5C80 67 20 83 50 87.5L50 100';

const STEPS: Array<{ title: string; text: string; icon: ReactNode }> = [
  {
    title: 'Conversa inicial',
    text: 'Você conta sua história, seu histórico de saúde e o que te preocupa. Ninguém tem pressa aqui.',
    icon: (
      <svg className={styles.icon} {...iconProps}>
        <path d="M8 10h32a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H22l-8 7v-7H8a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2z" />
        <path d="M15 19h18M15 25h10" />
      </svg>
    ),
  },
  {
    title: 'Avaliação completa',
    text: 'Um exame cuidadoso, com imagens quando forem necessárias. Tudo é mostrado e explicado na tela.',
    icon: (
      <svg className={styles.icon} {...iconProps}>
        <circle cx="21" cy="21" r="11" />
        <path d="M29 29l11 11" />
        <path d="M16 21.5l3.5 3.5l6-7" />
      </svg>
    ),
  },
  {
    title: 'Plano em linguagem simples',
    text: 'Opções, prioridades e prazos ditos com palavras claras. A decisão é sua, sempre.',
    icon: (
      <svg className={styles.icon} {...iconProps}>
        <rect x="10" y="8" width="28" height="34" rx="4" />
        <path d="M17 8V5.5h14V8" />
        <path d="M17 20h14M17 27h14M17 34h8" />
      </svg>
    ),
  },
  {
    title: 'Cuidado no seu ritmo',
    text: 'O tratamento começa quando você se sentir pronto, com acompanhamento a cada etapa.',
    icon: (
      <svg className={styles.icon} {...iconProps}>
        <path d="M24 41C10 32 6 24 6 17.5A9.5 9.5 0 0 1 24 13a9.5 9.5 0 0 1 18 4.5C42 24 38 32 24 41z" />
        <path d="M14 24h6l3-5l4 9l3-4h4" />
      </svg>
    ),
  },
];

export default function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const nodes = gsap.utils.toArray<HTMLElement>('[data-node]', el);
      const paths = gsap.utils.toArray<SVGPathElement>('[data-thread]', el);

      if (prefersReduced()) {
        nodes.forEach((n) => n.classList.add(styles.on));
        return;
      }

      const sync = (p: number) =>
        nodes.forEach((n, i) => n.classList.toggle(styles.on, p >= THRESHOLDS[i] - 0.02));

      // The thread runs top→bottom, so a vertical clip reveals it exactly like a draw-on
      // (dash tricks break with non-scaling strokes on a stretched viewBox).
      const svgs = paths.map((path) => path.ownerSVGElement!);
      gsap.set(svgs, { '--reveal': '100%' });
      gsap.to(svgs, {
        '--reveal': '0%',
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.6,
          onUpdate: (self) => sync(self.progress),
          onRefresh: (self) => sync(self.progress),
        },
      });
    },
    { scope: root },
  );

  return (
    <section id="consulta" ref={root} className={styles.journey} aria-labelledby="consulta-title">
      <div className="container">
        <header className={styles.head}>
          <SplitText as="h2" id="consulta-title" className={`display ${styles.title}`}>
            Sua primeira consulta, <em>sem mistério.</em>
          </SplitText>
          <p className={styles.intro} data-reveal="up">
            Saber o que vem pela frente tira o peso do primeiro dia. Este é o caminho que você percorre
            conosco, um passo de cada vez.
          </p>
        </header>

        <div className={styles.track}>
          <svg className={`${styles.thread} ${styles.threadDesk}`} viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
            <path d={DESKTOP_PATH} className={styles.rail} />
            <path d={DESKTOP_PATH} className={styles.line} data-thread />
          </svg>
          <svg className={`${styles.thread} ${styles.threadMob}`} viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
            <path d={MOBILE_PATH} className={styles.rail} />
            <path d={MOBILE_PATH} className={styles.line} data-thread />
          </svg>

          <ol className={styles.steps} role="list">
            {STEPS.map((s) => (
              <li key={s.title} className={styles.step}>
                <span className={styles.node} data-node aria-hidden="true" />
                <div className={styles.card} data-reveal="up">
                  {s.icon}
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.cta} data-reveal="up">
          <a className="btn btn--teal" href="#agendar" data-magnetic>
            Quero marcar uma conversa
            <span className="btn__arrow" aria-hidden="true">
              <svg viewBox="0 0 10 10"><path d="M0 5.6h7.6L4.1 9.1 5 10l5-5-5-5-.9.9 3.5 3.5H0z" fill="currentColor" /></svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
