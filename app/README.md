# PWA ONG C�es

Aplica��o PWA para apoiar a ONG de prote��o animal focada em c�es. Contempla vitrine de ado��o, doa��es, hist�rias, parceiros, voluntariado e painel administrativo.

## Requisitos
- Node.js 18+
- npm 9+

## Primeiros passos
```bash
npm install
npm run dev
```

Defina as vari�veis de ambiente em `.env` seguindo `.env.example`.

## Scripts �teis
- `npm run dev`: ambiente de desenvolvimento com Vite.
- `npm run build`: build de produ��o + typecheck.
- `npm run lint`: ESLint flat config.
- `npm run format`: Prettier check (Tailwind order incluso).
- `npm run test`: Vitest modo `run`.
- `npm run generate:sitemap`: gera `public/sitemap.xml` com rotas p�blicas.
- `npm run generate:robots`: atualiza `public/robots.txt` com `SITE_URL`.

## Estrutura
Estrutura detalhada em [`architecture/README.md`](architecture/README.md).

Principais diret�rios:
- `src/components`: UI base, layout e se��es reutiliz�veis.
- `src/config`: constantes, mocks e navega��o.
- `src/features`: dom�nios (ado��o, doa��es, parceiros, admin...).
- `src/providers`: providers globais (React Query, flags, admin).
- `src/router`: rotas p�blicas/admin com `react-router-dom`.
- `public`: manifest, service worker e assets PWA.
- `scripts`: utilit�rios Node/TS para sitemap e robots.

## Integra��o Firebase
1. Crie projetos `ong-caes-dev` e `ong-caes-prod`.
2. Configure Firestore (region `southamerica-east1`), Storage (mesma regi�o), Auth (email/senha) e Hosting.
3. Preencha `.env` com as chaves web.
4. Adapte as regras Firestore/Storage indicadas no documento original (tamb�m referenciadas em `architecture/README.md`).
5. Substitua os mocks por dados reais (cadastro via painel admin ou scripts de seed).

## Roadmap sugerido
- Implementar autentica��o real com Firebase Auth + claims admin.
- Criar formul�rios completos para CRUD (c�es, posts, parceiros) com upload para Storage (=5MB, m�x. 3 fotos).
- Substituir `window.alert` por toasts com Radix.
- Configurar CI/CD (GitHub Actions) e deploy Firebase Hosting com preview channels.
- Monitorar m�tricas (GA4) e erros (Sentry) ap�s configura��o das chaves.
