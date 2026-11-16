import SplitText from '@/components/motion/SplitText';
import styles from './About.module.css';

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

export default function About() {
  return (
    <section id="sobre" className={styles.about} aria-labelledby="sobre-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <div className={styles.titleWrap}>
            <SplitText as="h2" id="sobre-title" className={`display ${styles.title}`}>
              Odontologia séria, <em>conversa leve.</em>
            </SplitText>
            <svg className={styles.underline} viewBox="0 0 320 60" fill="none" aria-hidden="true" focusable="false" data-draw>
              <path
                d="M6 38C60 14 120 12 170 26C214 38 262 40 314 14"
                stroke="var(--coral)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M286 8L314 14L304 40"
                stroke="var(--coral)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          <div className={styles.text} data-stagger>
            <p data-reveal="up">
              Na Alva, acreditamos que um bom tratamento começa por ouvir. Antes de olhar para os dentes, queremos
              entender você: sua história, suas dúvidas e o que te deixa receoso.
            </p>
            <p data-reveal="up">
              Cada passo é explicado antes de acontecer, sem pressa e sem julgamento. E o cuidado é para a família
              inteira, de quem vem pela primeira vez a quem já conhece o caminho.
            </p>
          </div>

          <ul className={styles.principles} role="list" data-stagger>
            <li className={styles.principle} data-reveal="up">
              <svg className={styles.icon} {...iconProps} data-draw>
                <path d="M16 20a9 9 0 0 1 18 0c0 5-4 6.5-5 10c-.8 3-2.4 5-5 5a4.5 4.5 0 0 1-4.5-4.5" />
                <path d="M21 20a4 4 0 0 1 8 0" />
                <path d="M8 14c-1.5 3-1.5 7 0 10" />
              </svg>
              <div>
                <h3 className={styles.pTitle}>Escuta antes do tratamento</h3>
                <p>Você conta o que sente e o que espera. Só depois pensamos no que fazer.</p>
              </div>
            </li>
            <li className={styles.principle} data-reveal="up">
              <svg className={styles.icon} {...iconProps} data-draw>
                <rect x="10" y="9" width="28" height="33" rx="4" />
                <path d="M18 9V6.5h12V9" />
                <path d="M17 21l3 3l6-6" />
                <path d="M17 32h14" />
              </svg>
              <div>
                <h3 className={styles.pTitle}>Plano claro, sem surpresas</h3>
                <p>Você sabe o que será feito, por quê e em que ordem, antes de qualquer decisão.</p>
              </div>
            </li>
            <li className={styles.principle} data-reveal="up">
              <svg className={styles.icon} {...iconProps} data-draw>
                <path d="M6 23L24 8l18 15" />
                <path d="M11 20v20h26V20" />
                <path d="M24 35c-5-3.5-7.5-6-7.5-8.7a3.9 3.9 0 0 1 7.5-1.5a3.9 3.9 0 0 1 7.5 1.5c0 2.7-2.5 5.2-7.5 8.7z" />
              </svg>
              <div>
                <h3 className={styles.pTitle}>Cuidado para toda a família</h3>
                <p>Dos pequenos aos avós, cada pessoa é atendida com o mesmo tempo e a mesma atenção.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.media}>
          <div className={styles.frame} data-reveal="arch">
            <div className={styles.parallax} data-parallax="0.08">
              <img
                className={styles.img}
                src="/images/atendimento.webp"
                width={1168}
                height={784}
                alt="Dentista acolhendo uma paciente sorrindo na cadeira de atendimento"
                loading="lazy"
              />
            </div>
          </div>
          <div className={styles.badge} data-reveal="up">
            <svg className={styles.sparkle} viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false" data-draw>
              <path
                d="M20 4C21 14 26 19 36 20C26 21 21 26 20 36C19 26 14 21 4 20C14 19 19 14 20 4Z"
                stroke="var(--coral)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <p>Cada etapa explicada antes de acontecer.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
