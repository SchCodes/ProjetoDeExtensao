# Arquitetura do PWA ONG C�es

## Vis�o geral
- **Stack:** React 18 + Vite + TypeScript.
- **UI:** Tailwind CSS + Radix UI + �cones Lucide.
- **Estado:** React Query (dados ass�ncronos) + Context API para admin/feature flags.
- **Formul�rios:** react-hook-form + Zod.
- **Backend:** Firebase (Firestore, Storage, Auth). Scripts utilizam mocks quando o projeto n�o est� configurado.
- **PWA:** Manifest + service worker customizado (`public/sw.js`) para cache shell + imagens (stale-while-revalidate).

## Estrutura de pastas
```
app/
  architecture/           # documenta��o de arquitetura
  scripts/                # utilidades Node/TS (sitemap, robots)
  src/
    components/           # UI compartilhada (Base, Layout, Se��es)
    config/               # constantes, mocks e navega��o
    features/             # c�digos por dom�nio (adoption, donations, admin, etc.)
    hooks/                # ganchos reutiliz�veis (settings, leads)
    lib/                  # integra��es (firebase, analytics, pwa)
    pages/                # rotas p�blicas/admin
    providers/            # registram Context + QueryClient
    router/               # defini��o de rotas com react-router
    styles/               # Tailwind + estilos globais
```

## Firebase & dados
- `config/firebase.ts` l� vari�veis de ambiente (`.env` / `.env.example`).
- `lib/firebase/*` inicializa app, Firestore, Storage e Auth (no modo mock se ausente).
- **Cole��es esperadas:** `dogs`, `flags`, `settings`, `posts`, `partners`, `results`, `leads_adoption`, `leads_volunteer`.
- **Mocks:** `config/mocks.ts` fornece dados locais quando Firestore n�o est� configurado � garante UX no onboarding.
- **Regras sugeridas:** manter as descritas no documento/Docs para leitura p�blica e escrita restrita por token admin.

## Feature flags
- `FeatureFlagProvider` (`providers/FeatureFlagProvider.tsx`) carrega flags via React Query.
- Default em `config/featureFlags.ts`.
- Administra��o em `/admin/flags`, muta��es com invalidation autom�tica (`useFeatureFlagsMutation`).
- Rotas verificam flags para esconder se��es e evitar navega��o quebrada.

## P�ginas e rotas
- `router/AppRoutes.tsx` organiza rotas p�blicas (`SiteLayout`) e admin (`RequireAdmin` ? `SiteLayout`).
- Admin usa `AdminProvider` (estado local + localStorage) como fallback at� integra��o com Firebase Auth.
- Cada dom�nio possui componentes dedicados (ex.: ado��o ? `features/adoption`).

## PWA
- Manifest (`public/manifest.webmanifest`).
- Service Worker (`public/sw.js`) com estrat�gias *network-first* (dados) e *stale-while-revalidate* (imagens).
- Registro em `lib/pwa/registerServiceWorker.ts` chamado em `main.tsx` (ignorado em `import.meta.env.DEV`).
- Placeholder de �cones em `public/icons/README.txt` (exportar 192/512/maskable).

## Scripts auxiliares (`npm run generate:*`)
- `scripts/generate-sitemap.ts`: gera `public/sitemap.xml` com rotas p�blicas.
- `scripts/generate-robots.ts`: atualiza `public/robots.txt` com base no `SITE_URL` (fallback para dom�nio Firebase).

## Qualidade e automa��o
- ESLint (flat config) + TypeScript + Prettier (plugin Tailwind).
- Husky + lint-staged para pr�-commit.
- Vitest configurado (`vitest.config.ts`) com ambiente JSDOM + setup Testing Library.

## Pr�ximos passos recomendados
1. Integrar Firebase Auth real (roles admin) + fluxo de login na p�gina `/admin/login`.
2. Implementar CRUD completo (forms + uploads Storage) para c�es, posts, parceiros.
3. Ajustar toasts (`components/ui/AppToaster.tsx`) com Radix Toast ou Sonner e substituir `window.alert`.
4. Adicionar �ndices Firestore listados no documento e scripts de seed (`packages`/Cloud Functions). 
5. Configurar GitHub Actions ? lint/typecheck/build/deploy (Firebase Hosting).
