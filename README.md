# renanlido.me

Portfólio pessoal de [Renan Oliveira](https://renanlido.me) — Tech Lead & Desenvolvedor Full Stack Sênior. **Eu construo sistemas que não podem parar.**

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, SSG)
- React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first, tokens OKLCH)
- [next-intl](https://next-intl.dev) — i18n pt-BR (default) + en
- [Resend](https://resend.com) + [React Email](https://react.email) — formulário de contato
- next-themes (dark/light), Motion, Zod

## Rodando

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Variáveis (`.env`):

| Nome                 | Descrição                                       |
| -------------------- | ----------------------------------------------- |
| `RESEND_API_KEY`     | API key do Resend (obrigatória para o form)     |
| `CONTACT_TO_EMAIL`   | Destino das mensagens (default: e-mail do site) |
| `CONTACT_FROM_EMAIL` | Remetente verificado no Resend                  |

## SEO

Metadata API completa, JSON-LD (`Person`, `ProfilePage`, `WebSite`, `BlogPosting`), sitemap com hreflang, robots, manifest, OG images dinâmicas (`next/og`) e `llms.txt`.

## Estrutura

- `src/app/[locale]` — páginas (home, blog) por idioma
- `src/content` — cases, arsenal e posts (tipados, pt/en)
- `src/components` — seções e UI
- `src/actions/contact.ts` — server action do form (honeypot + time-trap + Zod)
- `src/emails` — template React Email
- `messages/` — traduções da UI
- `PRODUCT.md` / `DESIGN.md` — contexto estratégico e sistema visual

## Easter eggs

Tem. Dica: ↑↑↓↓←→←→BA. E abre o console.
