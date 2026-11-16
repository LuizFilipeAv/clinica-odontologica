import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import SplitText from '@/components/motion/SplitText';
import s from './Services.module.css';

type Area = {
  id: string;
  name: string;
  text: string;
  items: string[];
  img: string;
  landscape: boolean;
  alt: string;
  pos: string;
  icon: ReactNode;
};

/* Hand-drawn 48x48 icons. pathLength=1 lets one CSS dash rule draw every stroke. */
const P = { pathLength: 1, fill: 'none' } as const;
const TOOTH =
  'M14 7c-4.500 0-7 3.600-7 8.200 0 4.200 2 6.600 3 11.200.8 3.600 1.400 9.600 4.200 9.600 2.600 0 2.400-7.400 4.400-7.400h2.800c2 0 1.800 7.400 4.400 7.400 2.800 0 3.400-6 4.200-9.600 1-4.600 3-7 3-11.200C41 10.600 38.500 7 34 7c-3.400 0-4.800 1.400-10 1.400S17.400 7 14 7z';
const TOOTH_SM =
  'M17 12c-3.600 0-5.500 2.800-5.500 6.400 0 3.200 1.500 5 2.300 8.600.6 2.800 1.100 7.400 3.300 7.400 2 0 1.800-5.700 3.400-5.700h2c1.600 0 1.400 5.700 3.400 5.700 2.200 0 2.700-4.600 3.300-7.400.8-3.600 2.300-5.400 2.300-8.600C36.500 14.800 34.600 12 31 12c-2.700 0-3.800 1.100-7 1.100S19.700 12 17 12z';

const AREAS: Area[] = [
  {
    id: 'prevencao',
    name: 'Prevenção e limpeza',
    text: 'Aqui começa o cuidado que evita o resto. Fazemos uma avaliação sem pressa e explicamos o que vemos, em linguagem simples, antes de qualquer decisão.',
    items: ['Avaliação e limpeza profissional', 'Orientação de higiene para o seu caso', 'Plano de retornos combinado com você'],
    img: '/images/atendimento.webp',
    landscape: true,
    alt: 'Dentista conversando com uma paciente sentada na cadeira do consultório.',
    pos: '62% 50%',
    icon: (
      <>
        <path {...P} d={TOOTH} />
        <path {...P} d="M18 18c1.600 1.800 3.400 2.600 6 2.600" />
      </>
    ),
  },
  {
    id: 'clareamento',
    name: 'Clareamento e estética',
    text: 'Um sorriso mais claro e harmônico, respeitando a saúde do dente e o seu jeito de sorrir. Conversamos sobre expectativas antes de começar.',
    items: ['Avaliação da saúde dos dentes', 'Clareamento de acordo com o seu caso', 'Ajustes estéticos pontuais'],
    img: '/images/mulher.webp',
    landscape: false,
    alt: 'Mulher sorrindo de olhos baixos, em um fundo bege.',
    pos: '50% 28%',
    icon: (
      <>
        <path {...P} d="M20 8c.8 7 3 9.200 10 10-7 .8-9.200 3-10 10-.8-7-3-9.200-10-10 7-.8 9.200-3 10-10z" />
        <path {...P} d="M36 28c.4 3.600 1.600 4.800 5 5.200-3.400.4-4.600 1.600-5 5.200-.4-3.600-1.600-4.800-5-5.200 3.400-.4 4.600-1.600 5-5.200z" />
      </>
    ),
  },
  {
    id: 'odontopediatria',
    name: 'Odontopediatria',
    text: 'Consultas pensadas para o ritmo das crianças, com calma e explicações do tamanho delas. A ideia é que o consultório seja um lugar conhecido, não um susto.',
    items: ['Primeiras consultas e adaptação', 'Orientação aos responsáveis', 'Acompanhamento do crescimento dos dentes'],
    img: '/images/crianca.webp',
    landscape: false,
    alt: 'Menino sorrindo, de camiseta bege.',
    pos: '50% 30%',
    icon: (
      <>
        <path {...P} d={TOOTH_SM} />
        <path {...P} d="M24 17.500l1.200 2.400 2.600.4-1.900 1.800.5 2.600-2.400-1.300-2.400 1.300.5-2.600-1.900-1.800 2.600-.4z" />
        <path {...P} d="M39 5v6M36 8h6" />
      </>
    ),
  },
  {
    id: 'ortodontia',
    name: 'Ortodontia e alinhadores',
    text: 'Alinhar os dentes melhora a mordida e a limpeza do dia a dia, além do sorriso. Mostramos as opções disponíveis para o seu caso e o que cada uma pede de você.',
    items: ['Avaliação da mordida e do alinhamento', 'Aparelho fixo ou alinhadores', 'Acompanhamento ao longo do tratamento'],
    img: '/images/homem.webp',
    landscape: false,
    alt: 'Homem sorrindo para a câmera.',
    pos: '50% 26%',
    icon: (
      <>
        <path {...P} d="M6 32c3-11 10-17 18-17s15 6 18 17" />
        <path {...P} d="M11 33c3-8 8-12.500 13-12.500S34 25 37 33" />
        <path {...P} d="M24 15v5.500M15.500 18l2.500 3.500M32.500 18L30 21.500" />
      </>
    ),
  },
  {
    id: 'implantes',
    name: 'Implantes e reabilitação',
    text: 'Para recuperar um dente ou mais, planejamos cada etapa com exames e conversa franca sobre o caminho. Você sabe o que vem depois antes de dar o primeiro passo.',
    items: ['Planejamento com exames de imagem', 'Implante e prótese sobre ele', 'Reabilitação para mastigar com conforto'],
    img: '/images/homem.webp',
    landscape: false,
    alt: 'Homem sorrindo, mostrando os dentes.',
    pos: '50% 30%',
    icon: (
      <>
        <path {...P} d="M12 5c-2.500 0-4 2-4 4.500 0 2.400 1.200 3.800 1.800 5.800.4 1.500.8 3.700 2.200 3.700 1.400 0 1.200-2.700 2.400-2.700h11.200c1.200 0 1 2.700 2.400 2.700 1.400 0 1.800-2.200 2.200-3.700.6-2 1.800-3.400 1.800-5.800C36 7 34.500 5 32 5c-1.800 0-2.600.8-6 .8h-4C18.600 5.800 13.800 5 12 5z" transform="translate(2 0)" />
        <path {...P} d="M24 20v22M17 25h14M18 30h12M19.500 35h9M21.500 40h5" />
      </>
    ),
  },
  {
    id: 'canal',
    name: 'Tratamento de canal (endodontia)',
    text: 'O tratamento de canal existe para salvar o dente e aliviar a dor, e a anestesia cuida do seu conforto. Explicamos cada passo antes e durante, para você saber o que esperar.',
    items: ['Diagnóstico com exame de imagem', 'Limpeza e vedação do canal', 'Restauração para proteger o dente'],
    img: '/images/atendimento.webp',
    landscape: true,
    alt: 'Dentista acolhendo uma paciente durante o atendimento.',
    pos: '58% 50%',
    icon: (
      <>
        <path {...P} d="M24 5l15 5v10c0 10-6.500 17.500-15 21.500C15.500 37.500 9 30 9 20V10z" />
        <path {...P} d="M16.500 23l5 5 10-11" />
      </>
    ),
  },
];

function Sparkle() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 4c.8 7.600 3.400 10.200 12 12-8.600 1.800-11.200 4.400-12 12-.8-7.600-3.400-10.200-12-12 8.600-1.800 11.200-4.400 12-12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Services() {
  const [open, setOpen] = useState(0);
  const uid = useId();

  return (
    <section id="cuidados" className={`on-teal ${s.services}`} aria-labelledby="cuidados-title">
      <div className="container">
        <div className={s.head}>
          <SplitText as="h2" id="cuidados-title" className={`display ${s.title}`}>
            Cuidado completo, <em>do primeiro dente</em> ao sorriso de sempre.
          </SplitText>
          <p className={s.intro} data-reveal="up">
            Cuidamos de cada fase com explicações calmas e um planejamento feito antes de qualquer procedimento. Você entende o que vai acontecer e decide no seu tempo.
          </p>
        </div>

        <div className={s.layout}>
          <div className={s.listCol}>
            <ul className={s.list} role="list" data-stagger>
              {AREAS.map((a, i) => {
                const isOpen = open === i;
                const bodyId = `${uid}-body-${a.id}`;
                const btnId = `${uid}-btn-${a.id}`;
                return (
                  <li key={a.id} className={`${s.row} ${isOpen ? s.isOpen : ''}`} data-reveal="up">
                    <h3 className={s.rowHead}>
                      <button
                        type="button"
                        id={btnId}
                        className={s.trigger}
                        aria-expanded={isOpen}
                        aria-controls={bodyId}
                        onClick={() => setOpen(i)}
                      >
                        <svg className={s.icon} viewBox="0 0 48 48" aria-hidden="true">
                          {a.icon}
                        </svg>
                        <span className={s.name}>{a.name}</span>
                        <span className={s.plus} aria-hidden="true">
                          <svg viewBox="0 0 16 16">
                            <path d="M3 8h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path className={s.plusV} d="M8 3v10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div id={bodyId} role="region" aria-labelledby={btnId} className={s.panel}>
                      <div className={s.panelInner} inert={!isOpen}>
                        <p className={s.text}>{a.text}</p>
                        <p className={s.incl}>O que inclui</p>
                        <ul className={s.items} role="list">
                          {a.items.map((it) => (
                            <li key={it}>
                              <svg viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M3 8.600l3.200 3L13 4.600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className={s.cta} data-reveal="up">
              <span>Ainda com dúvidas sobre por onde começar?</span>
              <a className="btn btn--ghost" href="#consulta">
                Como é a primeira consulta
                <span className="btn__arrow" aria-hidden="true">
                  <svg viewBox="0 0 10 10">
                    <path d="M0 5.600h7.600L4.100 9.100 5 10l5-5-5-5-.9.9 3.500 3.500H0z" fill="currentColor" />
                  </svg>
                </span>
              </a>
            </p>
          </div>

          <div className={s.mediaCol}>
            <div className={s.sticky}>
              <div className={s.frame} data-reveal="arch" data-cursor="Ver">
                {AREAS.map((a, i) => (
                  <img
                    key={a.id}
                    src={a.img}
                    alt={i === open ? a.alt : ''}
                    aria-hidden={i === open ? undefined : true}
                    width={a.landscape ? 1168 : 784}
                    height={a.landscape ? 784 : 1168}
                    loading="lazy"
                    className={`${s.img} ${i === open ? s.imgOn : ''}`}
                    style={{ objectPosition: a.pos } as CSSProperties}
                  />
                ))}
              </div>
              <span className={s.badge} aria-hidden="true" style={{ ['--turn' as string]: `${open * 72}deg` }}>
                <Sparkle />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
