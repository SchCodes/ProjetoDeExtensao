# Arquitetura do PWA ONG Cães

## Visão geral
- **Stack:** React 18 + Vite + TypeScript.
- **UI:** Tailwind CSS + Radix UI + ícones Lucide.
- **Estado:** React Query (dados assíncronos) + Context API para admin/feature flags.
- **Formulários:** react-hook-form + Zod.
- **Backend:** Firebase (Firestore, Storage, Auth). Scripts utilizam mocks quando o projeto não está configurado.
- **PWA:** Manifest + service worker customizado (`public/sw.js`) para cache shell + imagens (stale-while-revalidate).

## Estrutura de pastas
```
app/
  architecture/           # documentação de arquitetura
  scripts/                # utilidades Node/TS (sitemap, robots)
  src/
    components/           # UI compartilhada (Base, Layout, Seções)
    config/               # constantes, mocks e navegação
    features/             # códigos por domínio (adoption, donations, admin, etc.)
    hooks/                # ganchos reutilizáveis (settings, leads)
    lib/                  # integrações (firebase, analytics, pwa)
    pages/                # rotas públicas/admin
    providers/            # registram Context + QueryClient
    router/               # definição de rotas com react-router
    styles/               # Tailwind + estilos globais
```

## Firebase & dados
- `config/firebase.ts` lê variáveis de ambiente (`.env` / `.env.example`).
- `lib/firebase/*` inicializa app, Firestore, Storage e Auth (no modo mock se ausente).
- **Coleções esperadas:** `dogs`, `flags`, `settings`, `posts`, `partners`, `results`, `leads_adoption`, `leads_volunteer`.
- **Mocks:** `config/mocks.ts` fornece dados locais quando Firestore não está configurado — garante UX no onboarding.
- **Regras sugeridas:** manter as descritas no documento/Docs para leitura pública e escrita restrita por token admin.

## Feature flags
- `FeatureFlagProvider` (`providers/FeatureFlagProvider.tsx`) carrega flags via React Query.
- Default em `config/featureFlags.ts`.
- Administração em `/admin/flags`, mutações com invalidation automática (`useFeatureFlagsMutation`).
- Rotas verificam flags para esconder seções e evitar navegação quebrada.

## Páginas e rotas
- `router/AppRoutes.tsx` organiza rotas públicas (`SiteLayout`) e admin (`RequireAdmin` ? `SiteLayout`).
- Admin usa `AdminProvider` (estado local + localStorage) como fallback até integração com Firebase Auth.
- Cada domínio possui componentes dedicados (ex.: adoção ? `features/adoption`).

## PWA
- Manifest (`public/manifest.webmanifest`).
- Service Worker (`public/sw.js`) com estratégias *network-first* (dados) e *stale-while-revalidate* (imagens).
- Registro em `lib/pwa/registerServiceWorker.ts` chamado em `main.tsx` (ignorado em `import.meta.env.DEV`).
- Placeholder de ícones em `public/icons/README.txt` (exportar 192/512/maskable).

## Scripts auxiliares (`npm run generate:*`)
- `scripts/generate-sitemap.ts`: gera `public/sitemap.xml` com rotas públicas.
- `scripts/generate-robots.ts`: atualiza `public/robots.txt` com base no `SITE_URL` (fallback para domínio Firebase).

## Qualidade e automação
- ESLint (flat config) + TypeScript + Prettier (plugin Tailwind).
- Husky + lint-staged para pré-commit.
- Vitest configurado (`vitest.config.ts`) com ambiente JSDOM + setup Testing Library.

## Próximos passos recomendados
1. Integrar Firebase Auth real (roles admin) + fluxo de login na página `/admin/login`.
2. Implementar CRUD completo (forms + uploads Storage) para cães, posts, parceiros.
3. Ajustar toasts (`components/ui/AppToaster.tsx`) com Radix Toast ou Sonner e substituir `window.alert`.
4. Adicionar índices Firestore listados no documento e scripts de seed (`packages`/Cloud Functions). 
5. Configurar GitHub Actions ? lint/typecheck/build/deploy (Firebase Hosting).
