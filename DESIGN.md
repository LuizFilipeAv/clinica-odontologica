---
name: Alva Odontologia
description: Identidade de precisão acolhedora para uma clínica odontológica fictícia, em teal, creme e coral.
colors:
  teal: "#17645f"
  teal-deep: "#0e4a46"
  teal-night: "#0a3431"
  teal-soft: "#d6e6e1"
  teal-mist: "#e9f1ee"
  teal-bright: "#1f7a73"
  cream: "#f3eee8"
  cream-deep: "#e7dfd4"
  paper: "#faf7f3"
  coral: "#ff6845"
  coral-deep: "#c63f1f"
  coral-soft: "#ffe1d7"
  coral-hover: "#ff7c5e"
  ink: "#102b28"
  ink-soft: "#3d5652"
  ink-mute: "#5f7470"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, Figtree Variable, sans-serif"
    fontSize: "clamp(3rem, 2.1rem + 4.2vw, 5.75rem)"
    fontWeight: 750
    lineHeight: 0.95
    letterSpacing: "-0.022em"
  headline:
    fontFamily: "Bricolage Grotesque Variable, Figtree Variable, sans-serif"
    fontSize: "clamp(2.3rem, 1.75rem + 2.5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque Variable, Figtree Variable, sans-serif"
    fontSize: "clamp(1.6rem, 1.35rem + 1.1vw, 2.4rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  subtitle:
    fontFamily: "Figtree Variable, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.1rem + 0.45vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Figtree Variable, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.13rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Figtree Variable, system-ui, sans-serif"
    fontSize: "clamp(0.84rem, 0.81rem + 0.15vw, 0.93rem)"
    fontWeight: 600
    lineHeight: 1.35
  logo-header:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "1.8rem"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.045em"
  logo-header-wide:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "2.1rem"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.045em"
  logo-hero:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "min(26vw, 33svh)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.045em"
  logo-intro:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "clamp(5rem, 19vw, 13rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.045em"
  seal:
    fontFamily: "Figtree Variable, system-ui, sans-serif"
    fontSize: "10.6px"
    fontWeight: 800
    letterSpacing: "0.16em"
  caption:
    fontFamily: "Figtree Variable, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
  logo-footer:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "clamp(5rem, 18vw, 15rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.045em"
rounded:
  hair: "2px"
  focus: "6px"
  thumb: "10px"
  s: "12px"
  m: "24px"
  l: "clamp(24px, 1rem + 2vw, 44px)"
  arch: "999px 999px 24px 24px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 0.6rem + 1.8vw, 2rem)"
  section: "clamp(5rem, 3.5rem + 7vw, 10rem)"
  max: "1360px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.35em"
  button-teal:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.35em"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "currentColor"
    rounded: "{rounded.pill}"
    padding: "0.8em 1.35em"
  header-pill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  card-teal:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.cream}"
    rounded: "{rounded.l}"
  photo-arch:
    backgroundColor: "{colors.teal-soft}"
    rounded: "{rounded.arch}"
---

# Design System: Alva Odontologia

## Overview

**Creative North Star: "Precisão acolhedora"**

Uma clínica que quer ser levada a sério sem parecer fria. A precisão vem da tipografia justa, das extrusões calculadas do logo, de uma paleta curta e de entradas em expo-out. O acolhimento vem do creme, dos cantos generosos, dos traços desenhados à mão e do coral usado como faísca. A base visual é o projeto de petshop do autor (cards arredondados, wordmark gigante, marquee, cursor que segue o mouse), traduzida para odontologia e acalmada.

**Key Characteristics:**
- Arco (janela de dente) como forma-assinatura das fotografias.
- Wordmark extrudado e hachurado, com um sorriso desenhado por baixo.
- Cards teal bem arredondados sobre fundo papel e creme.
- Pílulas com destaque deslizante, traços à mão, faixas de marquee e cursor que acompanha o mouse.
- Movimento calmo, com overshoot apenas em toque e hover.

## Colors

Teal conduz, creme é o segundo campo, coral é a faísca. O tinteiro (ink) é um teal muito escuro, nunca cinza neutro.

### Primary
- **Teal (#17645F):** hero, seções de destaque, botões secundários, cards.
- **Teal profundo (#0E4A46):** hover de botões teal e textos de ênfase.
- **Teal noite (#0A3431):** extrusão e contorno do logo, sombras.
- **Teal brilho (#1F7A73):** realce interno no card do hero.
- **Teal suave (#D6E6E1) e névoa (#E9F1EE):** fundos de apoio e hachura do logo sobre fundo claro.

### Secondary
- **Creme (#F3EEE8):** seções claras e texto sobre teal.
- **Creme profundo (#E7DFD4):** divisões e superfícies de apoio.
- **Papel (#FAF7F3):** fundo base do corpo e da pílula do cabeçalho (papel a 92% de opacidade, `rgb(250 247 243 / 0.92)`).

### Tertiary
- **Coral (#FF6845):** CTA, traços desenhados, selo, cursor, foco, seleção.
- **Coral profundo (#C63F1F):** coral para texto sobre fundo claro (4,6:1 sobre creme).
- **Coral suave (#FFE1D7):** fundos leves de destaque.
- **Coral hover (#FF7C5E):** estado hover do botão coral.

### Neutral
- **Tinta (#102B28):** texto principal e texto sobre coral.
- **Tinta suave (#3D5652) e muda (#5F7470):** texto secundário.
- **Linhas:** tinta a 14% sobre claro; creme a 22% sobre teal.

## Typography

**Display:** Bricolage Grotesque Variable, peso 700 a 800, `font-stretch: 90%`, tracking -0.022em nos títulos grandes. **Body:** Figtree Variable, com fallback system-ui.

Escala fluida (`--step--1` a `--step-4`): rótulo 0.84-0.93rem, corpo 1-1.13rem, subtítulo 1.2-1.5rem, título 1.6-2.4rem, headline 2.3-4rem, display 3-5.75rem. Títulos usam entrelinha 0.95-1 e `text-wrap: balance`; parágrafos usam `text-wrap: pretty`. Dentro de `.display`, `<em>` vira coral sem itálico.

**Tamanhos do logo (wordmark):** cabeçalho 1.8rem (2.1rem a partir de 900px), hero `min(26vw, 33svh)` (30vw no celular), rodapé `clamp(5rem, 18vw, 15rem)`, intro do hero `clamp(5rem, 19vw, 13rem)`. Selo circular usa 10.6px e legendas pequenas 0.8rem. O logo escala por `font-size` e usa peso 800, tracking -0.045em.

## Layout

Contêiner de até 1360px com gutter fluido; seções com respiro de 5rem a 10rem. Composição em coluna única no celular e duas colunas a partir de 900px. Breakpoints usados: 420px, 700px, 720px, 860px, 900px e 960px. O cabeçalho é uma pílula flutuante que ganha fundo papel (92%) ao rolar.

## Elevation & Depth

Profundidade vem principalmente de tom e de forma: card teal sobre papel, foto em arco sobre card. Duas sombras suaves e teal, `--shadow-soft` (0 18px 40px -20px) e `--shadow-lift` (0 30px 60px -26px), aparecem só em elementos que levantam. O logo usa extrusão sólida em text-shadow empilhado, não sombra difusa.

## Shapes

- **Arco (`--radius-arch`):** topo totalmente arredondado, base em 24px. Forma de janela de dente para fotos.
- **Cards:** `--radius-l` (24px a 44px) para cards teal e seções.
- **Raios menores:** 12px e 24px para itens internos; 2px, 6px (foco) e 10px (barra de rolagem) para detalhes.
- **Pílulas:** 999px para botões, navegação e chips.
- Traços desenhados à mão em coral, com `stroke-linecap: round`.

## Components

### Logo
Wordmark "Alva" grosso, extrudado para o canto superior direito, com hachura gravada nas faces laterais e um sorriso em traço sob as letras, mais a legenda "Odontologia" em caixa alta espaçada. A hachura usa `background-clip: text` com gradiente repetido: é gravura intencional, não texto com gradiente decorativo. Variantes `on-teal` e `on-light`.

### Botões
Pílulas de 48px de altura mínima. Primário coral com texto tinta; teal com texto creme; ghost com contorno. A seta fica em um círculo que gira ao hover; o clique reduz a escala. Foco por teclado em contorno coral de 3px.

### Cabeçalho e navegação
Pílula flutuante com destaque deslizante sob o link ativo e menu em tela cheia no celular.

### Cards teal e fotos em arco
Cards teal arredondados guardam o wordmark gigante; o retrato fica em um arco com anel creme. A revelação "arch" sobe a foto dentro do arco.

### Marquee e traços
Faixas de texto em loop e ícones desenhados à mão (`data-draw`) que se traçam ao entrar na tela.

### Cursor
Um cursor que segue o mouse, com rótulo opcional por `data-cursor`, ativo apenas com hover disponível.

### Movimento
Easing `--ease-out` (expo-out), `--ease-in-out` e `--ease-back` (overshoot só em toque). Durações 180ms, 320ms e 760ms. Reveals declarativos (`up`, `fade`, `scale`, `clip`, `arch`), palavras subindo de uma máscara, Lenis na rolagem. `prefers-reduced-motion` é respeitado.

## Do's and Don'ts

### Do:
- **Do** usar `--ink` sobre coral e `--cream` ou `--paper` sobre teal.
- **Do** usar `--coral-deep` quando o coral for texto sobre fundo claro.
- **Do** manter foco visível e respeitar `prefers-reduced-motion`.
- **Do** usar o arco para fotografias e deixar o coral como faísca rara.

### Don't:
- **Don't** colocar creme ou branco sobre coral: não passa no contraste.
- **Don't** inventar dados de clínica (endereço, telefone, registros, depoimentos) nem apresentar o agendamento simulado como real.
- **Don't** usar eyebrow ou kicker acima dos títulos.
- **Don't** usar cinza neutro: o ink é teal escuro.
- **Don't** adicionar sombras decorativas além de `--shadow-soft` e `--shadow-lift`.
