import { useId, useLayoutEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import SplitText from '@/components/motion/SplitText';
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from '@/lib/motion';
import styles from './CtaFinal.module.css';

const SLOTS = ['08:30', '10:00', '11:30', '14:00', '15:30', '17:00'];

type Day = { key: string; weekday: string; num: string; label: string; seed: number };

/** Next 6 weekdays (Sundays skipped), starting tomorrow. */
function nextDays(): Day[] {
  const short = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
  const long = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const out: Day[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (out.length < 6) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue;
    out.push({
      key: d.toISOString().slice(0, 10),
      weekday: short.format(d).replace('.', ''),
      num: String(d.getDate()),
      label: long.format(d),
      seed: d.getDate() + d.getMonth(),
    });
  }
  return out;
}

/** Deterministic: exactly 2 of the 6 slots are unavailable each day. */
const isTaken = (seed: number, i: number) => (seed + i * 2) % 3 === 0;

function Sparkle() {
  return (
    <svg className={styles.sparkle} viewBox="0 0 120 120" fill="none" aria-hidden="true" data-draw>
      <path d="M60 8C62 40 80 58 112 60C80 64 62 82 60 112C58 82 40 64 8 60C40 56 58 40 60 8Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M96 14V30M88 22H104" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Arrow-key navigation for a roving-tabindex radiogroup. */
function arrowNav(e: KeyboardEvent<HTMLElement>) {
  const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
  if (!keys.includes(e.key)) return;
  const radios = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]:not([aria-disabled="true"])'));
  if (!radios.length) return;
  const cur = radios.indexOf(document.activeElement as HTMLButtonElement);
  let next = cur;
  if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = radios.length - 1;
  else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (cur + 1) % radios.length;
  else next = (cur - 1 + radios.length) % radios.length;
  e.preventDefault();
  radios[next].focus();
  radios[next].click();
}

export default function CtaFinal() {
  const uid = useId();
  const days = useMemo(nextDays, []);
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [done, setDone] = useState<string | null>(null);

  const root = useRef<HTMLElement>(null);
  const peek = useRef<HTMLDivElement>(null);
  const dayBar = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  const day = days.find((d) => d.key === dayKey) ?? null;
  const taken = (i: number) => (day ? isTaken(day.seed, i) : false);
  const firstDay = days[0].key;
  const canSubmit = !!day && !!time && name.trim().length > 0;

  // Sliding highlight: measure the selected day pill (re-measure on resize / fonts)
  useLayoutEffect(() => {
    const bar = dayBar.current;
    if (!bar || !dayKey) { setPill(null); return; }
    const measure = () => {
      const el = bar.querySelector<HTMLElement>('[aria-checked="true"]');
      if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [dayKey, done]);

  const pickDay = (k: string) => {
    if (k === dayKey) return;
    setDayKey(k);
    setTime(null);
    dayBar.current?.querySelector<HTMLElement>(`[data-k="${k}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: prefersReduced() ? 'auto' : 'smooth' });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setDone(name.trim());
  };

  const reset = () => {
    setDone(null);
    setDayKey(null);
    setTime(null);
    setName('');
  };

  useGSAP(() => {
    const el = peek.current;
    if (!el || prefersReduced()) return;
    gsap.fromTo(
      el.querySelector('img'),
      { yPercent: 40 },
      { yPercent: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 98%', end: 'top 60%', scrub: 0.5 } },
    );
    ScrollTrigger.refresh();
  }, { scope: root });

  return (
    <section id="agendar" ref={root} className={styles.cta} aria-labelledby="cta-title">
      <div className={`on-teal ${styles.card}`}>
        <div className={styles.main}>
          <div className={styles.copy}>
            <SplitText as="h2" id="cta-title" className={`display ${styles.title}`}>
              Vamos cuidar do <em>seu sorriso?</em>
            </SplitText>
            <p className={styles.lead} data-reveal="up">
              Escolha um dia e um horário para uma primeira conversa. Leva menos tempo do que parece.
            </p>
          </div>
          <div className={styles.deco}>
            <div ref={peek} className={styles.peek}>
              <img
                src="/images/homem.webp"
                width={784}
                height={1168}
                alt="Homem sorrindo, olhando para a câmera"
                loading="lazy"
              />
            </div>
            <Sparkle />
          </div>
        </div>

        <div className={styles.side} data-reveal="up">
          <div className={styles.widget}>
            {done === null ? (
              <form className={styles.form} onSubmit={onSubmit} aria-label="Pedido de horário (simulação)" key="form">
                <div className={styles.group}>
                  <p className={styles.legend} id={`${uid}-d`}>Escolha o dia</p>
                  <div
                    ref={dayBar}
                    className={styles.days}
                    role="radiogroup"
                    aria-labelledby={`${uid}-d`}
                    onKeyDown={arrowNav}
                  >
                    {pill && <span className={styles.slider} aria-hidden="true" style={{ width: pill.w, transform: `translateX(${pill.x}px)` }} />}
                    {days.map((d) => {
                      const on = d.key === dayKey;
                      return (
                        <button
                          key={d.key}
                          type="button"
                          role="radio"
                          data-k={d.key}
                          aria-checked={on}
                          aria-label={d.label}
                          tabIndex={on || (!dayKey && d.key === firstDay) ? 0 : -1}
                          className={styles.day}
                          onClick={() => pickDay(d.key)}
                        >
                          <span className={styles.dayW}>{d.weekday}</span>
                          <span className={styles.dayN}>{d.num}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.group}>
                  <p className={styles.legend} id={`${uid}-t`}>
                    Escolha o horário <span className={styles.demo}>horários de demonstração</span>
                  </p>
                  <div
                    className={styles.times}
                    role="radiogroup"
                    aria-labelledby={`${uid}-t`}
                    aria-describedby={`${uid}-hint`}
                    onKeyDown={arrowNav}
                  >
                    {SLOTS.map((s, i) => {
                      const off = taken(i);
                      const on = time === s;
                      const firstFree = SLOTS.findIndex((_, j) => !taken(j)) === i;
                      return (
                        <button
                          key={s}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          aria-disabled={off || !day}
                          tabIndex={on || (!time && firstFree && !!day) ? 0 : -1}
                          className={styles.time}
                          data-off={off || undefined}
                          data-idle={!day || undefined}
                          onClick={() => { if (!off && day) setTime(s); }}
                        >
                          {s}
                          {off && <span className="visually-hidden"> (indisponível)</span>}
                        </button>
                      );
                    })}
                  </div>
                  <p className={styles.hint} id={`${uid}-hint`}>
                    {day ? `Horários livres em ${day.label}.` : 'Escolha um dia para ver os horários.'}
                  </p>
                </div>

                <div className={styles.field}>
                  <label htmlFor={`${uid}-n`}>Seu nome</label>
                  <input
                    id={`${uid}-n`}
                    type="text"
                    name="nome"
                    required
                    autoComplete="given-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={60}
                  />
                </div>

                <button type="submit" className={`btn ${styles.submit}`} disabled={!canSubmit}>
                  Pedir horário
                </button>
              </form>
            ) : null}

            <div className={styles.live} aria-live="polite">
              {done !== null && (
                <div className={styles.done} key="done">
                  <svg className={styles.check} viewBox="0 0 96 96" fill="none" aria-hidden="true">
                    <path className={styles.checkRing} pathLength={1} d="M48 8C70 7 89 25 88 48C87 71 69 89 46 88C24 87 7 69 8 46C9 26 26 9 48 8Z" stroke="var(--coral)" strokeWidth="5" strokeLinecap="round" />
                    <path className={styles.checkTick} pathLength={1} d="M28 50L43 65L69 32" stroke="var(--coral)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className={styles.doneTitle}>Tudo certo, {done}!</p>
                  <p className={styles.doneText}>
                    Isto é uma demonstração: a Alva é uma clínica fictícia e nenhum dado foi enviado.
                  </p>
                  <button type="button" className={styles.again} onClick={reset}>Escolher outro horário</button>
                </div>
              )}
            </div>
          </div>
          <p className={styles.note}>Simulação de portfólio · nenhum agendamento é realizado</p>
        </div>
      </div>
    </section>
  );
}
