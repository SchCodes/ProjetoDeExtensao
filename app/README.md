# PWA ONG Cães

Aplicação PWA para apoiar a ONG de proteção animal focada em cães. Contempla vitrine de adoção, doações, histórias, parceiros, voluntariado e painel administrativo.

## Requisitos
- Node.js 18+
- npm 9+

## Primeiros passos
```bash
npm install
npm run dev
```

Defina as variáveis de ambiente em `.env` seguindo `.env.example`.

## Scripts úteis
- `npm run dev`: ambiente de desenvolvimento com Vite.
- `npm run build`: build de produção + typecheck.
- `npm run lint`: ESLint flat config.
- `npm run format`: Prettier check (Tailwind order incluso).
- `npm run test`: Vitest modo `run`.
- `npm run generate:sitemap`: gera `public/sitemap.xml` com rotas públicas.
- `npm run generate:robots`: atualiza `public/robots.txt` com `SITE_URL`.

## Estrutura
Estrutura detalhada em [`architecture/README.md`](architecture/README.md).

Principais diretórios:
- `src/components`: UI base, layout e seções reutilizáveis.
- `src/config`: constantes, mocks e navegação.
- `src/features`: domínios (adoção, doações, parceiros, admin...).
- `src/providers`: providers globais (React Query, flags, admin).
- `src/router`: rotas públicas/admin com `react-router-dom`.
- `public`: manifest, service worker e assets PWA.
- `scripts`: utilitários Node/TS para sitemap e robots.

## Integração Firebase
1. Crie projetos `ong-caes-dev` e `ong-caes-prod`.
2. Configure Firestore (region `southamerica-east1`), Storage (mesma região), Auth (email/senha) e Hosting.
3. Preencha `.env` com as chaves web.
4. Adapte as regras Firestore/Storage indicadas no documento original (também referenciadas em `architecture/README.md`).
5. Substitua os mocks por dados reais (cadastro via painel admin ou scripts de seed).

## Roadmap sugerido
- Implementar autenticação real com Firebase Auth + claims admin.
- Criar formulários completos para CRUD (cães, posts, parceiros) com upload para Storage (=5MB, máx. 3 fotos).
- Substituir `window.alert` por toasts com Radix.
- Configurar CI/CD (GitHub Actions) e deploy Firebase Hosting com preview channels.
- Monitorar métricas (GA4) e erros (Sentry) após configuração das chaves.
