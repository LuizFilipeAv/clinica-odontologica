# Briefing — Alva Odontologia (v2)

Clínica odontológica **fictícia** para portfólio. Sério e profissional como um dentista quer, amigável e convidativo para quem vai marcar a consulta. Base visual: o projeto do petshop (`C:/portfolio/clinica-petshop`), traduzido para odontologia.

## Marca

- **Nome:** Alva Odontologia. "Alva" é branca, pura, a cor da aurora: remete ao sorriso sem ser literal. Substitui o "Happy Tooth" da referência.
- **Logo:** wordmark grosso com extrusão hachurada (inspirado na referência enviada) e um traço em forma de sorriso por baixo. Feito em código (`src/components/Logo`), escala com `font-size`, anima na entrada.

## Paleta

| Token | Hex | Papel |
|---|---|---|
| `--teal` | `#17645F` | Principal: hero, seções de destaque, botões secundários |
| `--cream` | `#F3EEE8` | Secundária: seções claras, texto sobre teal |
| `--coral` | `#FF6845` | Destaque: CTA, traços desenhados, selo, cursor |

Texto sobre coral é sempre `--ink` (creme sobre coral não passa contraste). Coral em texto sobre fundo claro usa `--coral-deep`.

## Motion

Personalidade "precisão acolhedora": entradas calmas em expo-out, overshoot só em toque/hover.

1. **Intro:** o logo monta em três tempos (letras sobem, a extrusão sai de trás, o sorriso se desenha) e a cortina sobe. Só na primeira visita da sessão.
2. **Hero:** card teal com o wordmark gigante e um retrato num arco (formato de dente/janela) na frente. O seletor "Para você / Para crianças" troca o retrato. No scroll, o card recua e o wordmark sobe.
3. **Cuidados:** acordeão com foto em arco fixa ao lado, trocando com crossfade. Ícones se desenham ao abrir.
4. **Primeira consulta:** um fio desenhado no scroll liga os quatro passos e acende cada ponto quando chega nele.
5. **Espaço:** a foto da recepção abre de uma janela em arco para tela cheia, fixa enquanto você rola.
6. **Agendar:** widget de agendamento **simulado** (nada é enviado).
7. Global: Lenis, reveals por palavra, traços desenhados, cursor que segue o mouse, botões magnéticos. Tudo respeita `prefers-reduced-motion`.

## Imagens

As 5 imagens atuais (`public/images`) funcionam bem e continuam no site: tons quentes e bege combinam com o creme e contrastam com o teal. O site está completo com elas.

Os prompts abaixo são **opcionais** e servem para melhorar dois pontos: o retrato do hero (a mulher atual olha para baixo, e o sorriso merece estar de frente) e a repetição de fotos no acordeão de Cuidados (hoje `homem` e `atendimento` aparecem duas vezes).

**Regras para todas:**
- Nenhum texto, logo, marca ou crachá com nome.
- Gerar no maior tamanho possível. Eu converto para WebP e recorto.
- Salvar em `assets/originais/` com o nome indicado.
- Negative prompt, se o gerador aceitar: `text, letters, watermark, logo, name badge, braces brand, extra teeth, deformed teeth, deformed hands, blurry, cartoon, illustration, 3d render, oversaturated`

### 1. Hero: adulto (`hero-adulto.png`), prioridade alta
Proporção 2:3 (vertical).
```
Editorial studio portrait of a woman in her early 30s with warm brown skin and dark wavy shoulder-length hair, looking straight at the camera with a genuine, relaxed open smile showing natural healthy teeth (not perfect veneers). Head and shoulders, centered, wearing a plain soft cream knit top. Seamless warm cream backdrop (#F3EEE8), soft diffused window light from the left, gentle shadow, natural skin texture, calm and confident mood. The top 20% of the frame is empty backdrop above her head. Shot on 85mm, shallow depth of field, premium magazine look.
```

### 2. Hero: criança (`hero-crianca.png`), prioridade alta
Mesmo ensaio do item 1: mesma luz, fundo e enquadramento, para a troca do seletor parecer natural.
```
Editorial studio portrait of a 7-year-old child with curly dark hair and light brown skin, looking straight at the camera with a big natural gap-toothed smile (one baby tooth missing). Head and shoulders, centered, wearing a plain soft teal (#17645F) t-shirt with no print. Seamless warm cream backdrop (#F3EEE8), soft diffused window light from the left, natural skin texture, joyful but calm. The top 20% of the frame is empty backdrop above the head. Same session, same light and framing as a matching adult portrait. Shot on 85mm, premium magazine look.
```

### 3. Cuidados: ortodontia (`service-ortodontia.png`)
Proporção 2:3.
```
Editorial portrait of a teenager around 15 smiling at the camera while holding a clear transparent dental aligner between two fingers near the face, natural light, plain warm beige wall background, soft focus, natural skin, genuine smile with natural teeth, no text, calm modern dental clinic mood, warm neutral tones with a subtle teal (#17645F) sweater.
```

### 4. Cuidados: implantes e reabilitação (`service-implantes.png`)
Proporção 2:3.
```
Editorial portrait of a man in his late 60s with grey hair and a short grey beard, laughing naturally and looking slightly off camera, healthy natural-looking teeth, wearing a plain cream linen shirt, plain warm beige wall background, soft window light, natural skin texture, dignified and warm, premium magazine style, no text.
```

### 5. Cuidados: tratamento de canal (`service-canal.png`)
Proporção 3:2 (horizontal).
```
Bright modern dental clinic: a female dentist in a plain white coat (no logos, no name badge) sits beside a relaxed adult patient in the dental chair and explains something on a small blank monitor turned slightly away from the camera (screen content not readable). Warm light wood cabinets, cream walls, one small plant, a muted teal (#17645F) accent on the chair upholstery. Calm, reassuring, documentary style, natural light, no text anywhere.
```

### Ordem de prioridade
1. `hero-adulto` e `hero-crianca` (juntos, mesmo ensaio).
2. `service-ortodontia`, `service-implantes`, `service-canal`.

### Feito em código (não precisa de imagem)
Logo e wordmark, traço do sorriso, selo giratório, traços de brilho, fio da jornada, ícones de cuidados e o widget de agendamento.
