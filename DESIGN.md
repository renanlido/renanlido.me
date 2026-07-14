# Design

Sistema visual de renanlido.me. Fonte da verdade dos tokens: [globals.css](src/app/globals.css) (`@theme` + `.dark`).

## Conceito

"Divertido com credibilidade": a personalidade vive na interação (mascote, easter eggs, copy com humor, marcador amarelo), a credibilidade vive no conteúdo (cases com números de produção). Sem fotos pessoais — o mascote amarelo de óculos escuros é o rosto do site.

## Cor

Estratégia **committed**: violeta carrega a identidade (flagship case drenched, links, seleção, detalhes), amarelo alta-visibilidade é a cor de **ação e destaque** (CTAs, `<mark>`, mascote) — referência física: colete e sinalização de porto. OKLCH em tudo.

| Token               | Light                   | Dark                    |
| ------------------- | ----------------------- | ----------------------- |
| `--color-bg`        | `oklch(1 0 0)`          | `oklch(0.15 0.028 272)` |
| `--color-surface`   | `oklch(0.965 0.01 272)` | `oklch(0.19 0.032 272)` |
| `--color-ink`       | `oklch(0.21 0.03 272)`  | `oklch(0.93 0.012 272)` |
| `--color-muted`     | `oklch(0.45 0.025 272)` | `oklch(0.71 0.022 272)` |
| `--color-line`      | `oklch(0.9 0.012 272)`  | `oklch(0.29 0.032 272)` |
| `--color-primary`   | `oklch(0.5 0.21 272)`   | `oklch(0.74 0.15 272)`  |
| `--color-accent`    | `oklch(0.87 0.17 96)`   | igual                   |
| `--color-on-accent` | `oklch(0.24 0.04 272)`  | `oklch(0.2 0.04 272)`   |
| `--color-ok`        | `oklch(0.62 0.17 150)`  | `oklch(0.72 0.17 150)`  |

Regras: texto sobre amarelo é sempre escuro (`on-accent`); texto sobre violeta light é branco (`on-primary`); no dark o primary clareia e recebe texto escuro. `<mark>` = bloco accent sólido com `box-decoration-break: clone` — a assinatura tipográfica do site.

## Tipografia

- **Bricolage Grotesque** (variable, eixos `opsz`/`wdth`): display e corpo. Personalidade sem fantasia.
- **JetBrains Mono**: métricas, labels técnicos, chips de stack, timestamps.

Escala fluida (tokens `--text-*` no `@theme`): `display` clamp 2.75–5.25rem / `title` 2–3.25rem / `heading` 1.375–1.75rem / `lede` 1.125–1.31rem / `body` 1.0625rem / `small` 0.875rem / `label` mono 0.8125rem. `text-wrap: balance` em h1–h3, `pretty` em parágrafos.

## Componentes e padrões

- **Botão primário**: pill accent amarelo, texto escuro bold, hover levanta 2px (`hover:-translate-y-0.5`).
- **Botão secundário**: pill ghost com borda `line`, hover vira violeta.
- **Case flagship**: painel `bg-primary` drenched, bullets com dot accent, métricas em `dl` mono.
- **Cases de apoio**: borda `line`, um deles `bg-tint` para quebrar simetria; alturas variadas por hierarquia real.
- **Chips de stack**: pill mono com borda (`Ferramentas do crime`).
- **Status pill**: dot verde `--color-ok` com ping + mono label.
- **PulseLine**: SVG heartbeat animado (`stroke-dashoffset`), pausa em `prefers-reduced-motion`.
- **AvatarGlyph (mascote)**: SVG amarelo com óculos; clique alterna modo festa (chapéu + sorriso). Herdeiro espiritual do flip-card antigo.

## Motion

- Ease: `--ease-out-quart` / `--ease-out-expo`. Sem bounce.
- Hero: choreografia de entrada via CSS keyframes (`hero-rise`) com stagger por `animation-delay` — roda sem JS.
- Seções: `.reveal` (IntersectionObserver + classe `is-in`); só esconde quando `html.js` presente — sem JS o conteúdo fica visível.
- Easter eggs: konami code → confete + toast; console ASCII art; título da aba muda no blur.
- `prefers-reduced-motion: reduce` desativa tudo (global e por componente).

## Layout

- Container `max-w-6xl` com `px-5 md:px-8`; blog `max-w-3xl/4xl`.
- Seções `py-20 md:py-28`, alternância `bg-bg`/`bg-surface` com `border-y`.
- Header sticky sólido (sem blur decorativo), nav some no mobile (one-page scroll + footer).
- Z-index semântico: header 40, confetti 90, toast 95.

## Acessibilidade

WCAG 2.1 AA: contrastes verificados nos dois temas, skip-link, foco visível (`outline` 3px primary), `aria-invalid`/`aria-describedby` no form, `role="status"` em toasts/sucesso, navegação por teclado completa.
