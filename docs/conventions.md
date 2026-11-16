# Convenções do projeto: Alva Odontologia (v2)

Site conceitual da **Alva Odontologia**, uma clínica odontológica **fictícia**, feito como peça de portfólio. Tom: sério, formal e profissional (é um dentista), mas amigável e convidativo para o paciente. A base visual vem do projeto do petshop (`C:/portfolio/clinica-petshop`): cards arredondados, wordmark gigante, traços desenhados à mão, marquee, pílulas com destaque deslizante, cursor que segue o mouse. Aqui, tudo mais calmo e preciso.

**Stack:** Vite + React 19 + TypeScript strict, CSS Modules, GSAP 3 + ScrollTrigger + `@gsap/react`, Lenis. Sem Tailwind, sem biblioteca de UI, sem biblioteca de ícones (ícones são SVG desenhados à mão no próprio componente).

## Arquivos que você NÃO edita
`src/styles/globals.css`, `src/App.tsx`, `src/main.tsx`, `src/lib/motion.ts`, `src/components/motion/*`, `src/components/Logo/*`, `package.json`, `vite.config.ts`, `index.html`.
Crie **apenas** os componentes pedidos, cada um como `src/components/<Nome>/<Nome>.tsx` + `src/components/<Nome>/<Nome>.module.css` (export default).
Não faça commit, não rode `npm install`, `npm run dev` nem `npm run build`. Para checar tipos: `npx tsc --noEmit -p .` (na raiz do projeto).

## Tokens globais (CSS custom properties em `globals.css`)
- **Cores:** `--teal #17645F` (principal), `--teal-deep`, `--teal-night`, `--teal-soft`, `--teal-mist`; `--cream #F3EEE8` (secundária), `--cream-deep`, `--paper` (fundo base); `--coral #FF6845` (destaque), `--coral-deep` (coral para TEXTO sobre fundo claro), `--coral-soft`; `--ink`, `--ink-soft`, `--ink-mute`, `--line`, `--line-on-teal`.
- **Fontes:** `--font-display` (Bricolage Grotesque, já é o padrão de h1–h4), `--font-body` (Figtree).
- **Escala:** `--step--1` … `--step-4`, `--gutter`, `--section`, `--radius-s/m/l`, `--radius-arch` (arco de dente: topo totalmente arredondado), `--max`.
- **Motion:** `--ease-out`, `--ease-back`, `--ease-in-out`, `--dur-fast`, `--dur`, `--dur-slow`. Sombras: `--shadow-soft`, `--shadow-lift`.
- **Classes globais:** `container`, `display` (título grande; `<em>` vira coral, sem itálico), `on-teal` (no pai de seção teal, deixa `em` coral claro), `visually-hidden`, `btn`, `btn--teal`, `btn--ghost`, `btn__arrow`. Use em `className` como string: ``className={`btn ${s.cta}`}``.

## Contraste (obrigatório)
- Texto sobre teal: `--cream` ou `--paper`. Coral puro sobre teal só em texto grande (≥ 24px) ou decoração.
- Texto sobre creme/paper: `--ink`/`--ink-soft`; coral em texto só com `--coral-deep`.
- **Creme/branco sobre coral não passa.** Sobre coral use `--ink`.

## Motion: atributos declarativos (o runtime global trata)
- `data-reveal="up|fade|scale|clip|arch"`: entrada única quando o elemento aparece. `arch` = a foto sobe dentro de um arco (use em fotos com `border-radius: var(--radius-arch)`).
- `data-stagger` no pai: os filhos com `data-reveal` entram em sequência.
- `data-draw` em `<svg>` ou `<path>`: traço desenhado. O path precisa de `stroke`, `fill="none"` e `strokeLinecap="round"`.
- `data-parallax="0.1"`, `data-magnetic` e `data-cursor="Texto"` (rótulo do cursor ao passar).
- **Títulos com palavras subindo:** `import SplitText from '@/components/motion/SplitText'` → `<SplitText as="h2" id="x" className="display">Texto <em>destaque</em></SplitText>`.
- O runtime marca o elemento visível com o atributo `data-inview`. **Nunca** remova nem controle esse atributo pelo React.

## GSAP no React
```tsx
import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from '@/lib/motion';

const root = useRef<HTMLElement>(null);
useGSAP(() => {
  if (prefersReduced()) return;
  gsap.fromTo('.x', {...}, { scrollTrigger: { trigger: root.current, scrub: true } });
}, { scope: root });
```
- `useGSAP` faz o cleanup. Use `scope` e seletores relativos, ou refs.
- Anime só `transform`, `opacity`, `clip-path` (e `filter` com moderação).
- Listeners em `useEffect`, sempre com cleanup. Nada de rAF infinito.
- Respeite `prefersReduced()`. Com movimento reduzido o conteúdo aparece direto.
- Personalidade de motion: **"precisão acolhedora"** — entradas calmas em expo-out (500–900ms), overshoot pequeno (`--ease-back`) só em micro-interações de toque/hover. Nada saltitante.

## Imagens
Ficam em `public/images/` e são usadas com caminho absoluto, sempre com `width`, `height`, `alt` em português e `loading="lazy"` (exceto o hero):
`atendimento.webp` (1168×784, dentista acolhe paciente na cadeira), `espaco.webp` (1168×784, recepção clara com madeira e plantas), `mulher.webp` (784×1168, mulher sorrindo de olhos baixos, fundo bege), `homem.webp` (784×1168, homem sorrindo), `crianca.webp` (784×1168, menino sorrindo de camiseta bege).

## Regras de design (obrigatórias)
- Nada de eyebrow/kicker acima do título, texto em gradiente, glassmorphism decorativo, `border-left` colorido, sombras duras com offset sem blur, numeração 01/02/03 decorativa, emoji ou unicode no lugar de ícones. Ícones = SVG de traço consistente (stroke 1.75–2, `strokeLinecap="round"`).
- Evite grade de cards iguais (ícone + título + texto) como estrutura. Varie escala e composição.
- Responsivo de 360 a 1600px, sem scroll horizontal. Alvos de toque ≥ 44px. `:focus-visible` já é global.
- HTML semântico (`section` com `aria-labelledby`, listas, `button` para ações, `a` para navegação), `alt` em português, copy em pt-BR.

## Conteúdo: clínica fictícia
- **Não invente** números (pacientes, anos, notas), depoimentos, nomes de dentistas, CRO, endereço, telefone, e-mail, preços ou convênios.
- Toda interação que simula algo (agendar, enviar) deixa claro que é demonstração e não envia nada.
- Voz: segunda pessoa ("você"), frases curtas, calorosas e precisas. Sem jargão de marketing ("revolucionário", "o melhor").
