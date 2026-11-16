import { useId, useState } from 'react';
import SplitText from '@/components/motion/SplitText';
import styles from './Faq.module.css';

const ITEMS: { q: string; a: string[] }[] = [
  {
    q: 'Tenho medo de dentista. Como vocês lidam com isso?',
    a: [
      'Medo de dentista é mais comum do que parece, e dizer isso em voz alta já ajuda. Uma boa consulta começa com conversa: o profissional explica o que vai fazer antes de fazer, combina um sinal para você pausar quando quiser e respeita o seu ritmo.',
      'Conte o que te incomoda, seja barulho, agulha ou lembranças antigas. Com essa informação, a equipe pode adaptar a abordagem. Se o medo for muito intenso, vale falar com um profissional de saúde sobre as opções de acolhimento.',
    ],
  },
  {
    q: 'Com que frequência devo fazer uma consulta de rotina?',
    a: [
      'Não existe um intervalo único. Em geral, costuma-se recomendar retornos periódicos, mas o ritmo ideal depende da sua saúde bucal, do seu histórico e dos seus hábitos.',
      'Quem tem gengivite, cáries recorrentes ou usa aparelho pode precisar de acompanhamento mais próximo. Confirme com um dentista qual frequência faz sentido para você.',
    ],
  },
  {
    q: 'A partir de que idade a criança deve ir ao dentista?',
    a: [
      'As orientações de saúde costumam indicar que a primeira visita aconteça cedo, quando os primeiros dentes começam a aparecer. A ideia é acompanhar o desenvolvimento e orientar a família sobre higiene e alimentação, não esperar surgir um problema.',
      'Para saber o melhor momento no caso do seu filho, converse com um odontopediatra ou com o pediatra da família.',
    ],
  },
  {
    q: 'Clareamento deixa os dentes sensíveis?',
    a: [
      'Algumas pessoas sentem sensibilidade durante ou depois do clareamento, geralmente passageira. Outras não sentem nada. Isso varia com o método, com o tempo de uso e com a condição de cada dente.',
      'Antes de clarear, vale passar por uma avaliação: cáries, gengiva inflamada ou dentes já sensíveis mudam a indicação. Siga sempre a orientação de um dentista.',
    ],
  },
  {
    q: 'Alinhadores transparentes funcionam para qualquer caso?',
    a: [
      'Nem sempre. Alinhadores resolvem bem muitos casos, mas há situações em que outro tipo de aparelho é mais indicado. Quem decide isso é o ortodontista, depois de examinar a boca e avaliar os objetivos do tratamento.',
      'O resultado também depende do uso correto, que costuma exigir disciplina diária. Pergunte a um profissional qual caminho combina com o seu caso.',
    ],
  },
  {
    q: 'Este site agenda consultas de verdade?',
    a: [
      'Não. A Alva Odontologia é uma clínica fictícia, criada como projeto de portfólio. O formulário de horário é só uma simulação: nada é enviado, salvo ou compartilhado.',
      'Se você precisa de atendimento, procure um dentista da sua região.',
    ],
  },
];

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M12 4.5v15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.5 12h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Faq() {
  const uid = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set());

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="duvidas" className={styles.faq} aria-labelledby="faq-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <SplitText as="h2" id="faq-title" className={`display ${styles.title}`}>
            Dúvidas <em>comuns.</em>
          </SplitText>
          <p className={styles.lead} data-reveal="up">
            Respostas gerais, em linguagem simples. Para o seu caso, converse sempre com um dentista.
          </p>
        </div>

        <ul className={styles.list} role="list" data-stagger>
          {ITEMS.map((item, i) => {
            const isOpen = open.has(i);
            const bid = `${uid}-b${i}`;
            const pid = `${uid}-p${i}`;
            return (
              <li key={item.q} className={styles.item} data-open={isOpen} data-reveal="up">
                <h3 className={styles.q}>
                  <button type="button" id={bid} className={styles.btn} aria-expanded={isOpen} aria-controls={pid} onClick={() => toggle(i)}>
                    <span className={styles.qText}>{item.q}</span>
                    <span className={styles.icon}><PlusIcon /></span>
                  </button>
                </h3>
                <div id={pid} role="region" aria-labelledby={bid} className={styles.panel} inert={!isOpen}>
                  <div className={styles.clip}>
                    <div className={styles.answer}>
                      {item.a.map((t) => <p key={t}>{t}</p>)}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
