# PROJETO PWA – ONG DE CÃES (TRABALHO DE EXTENSÃO)

---

## 0) Visão Geral (mantida)
**Objetivo geral:** Construir um PWA para uma ONG de proteção animal (cães), priorizando **adoção**, **doações (PIX/itens)**, **histórias/resultados**, **parceiros** e **voluntariado/lar temporário**.  
**Dados:** Firestore. **Imagens:** Cloud Storage (teto operacional **5 GB**). **Auth:** Firebase Auth (admin). **Admin:** **feature flags** por seção.  
**MVP público:** Início, Adoção (lista/detalhe), Doações, Histórias/Resultados, Parceiros, Voluntário.  
**Futuro:** mapa interativo, push, relatórios, fluxo de adoção avançado.

---

## 1) Decisões de stack e padrões (DEFINIDO)
- **Framework:** **React 18 + Vite + TypeScript** (PT-BR apenas).
- **UI kit:** **Tailwind CSS** + **Radix UI** (primitivos acessíveis) + **Lucide** (ícones).
- **Gerência de estado:** React Query (fetch/cache) + Context para flags/usuário admin.
- **Formulários/validação:** **Zod** + **react-hook-form**.
- **Padrões de código:** **ESLint** + **Prettier** + **Husky** (pre-commit) + **Commitlint** (Conventional Commits).
- **Estrutura de pastas (sugerida):**
  ```text
  src/
    components/        # UI reutilizável
    features/          # domínios: adoption, donations, stories, partners, volunteer, admin
    pages/             # rotas (Vite + react-router)
    lib/               # firebase, api, utils
    hooks/             # ganchos
    types/             # TypeScript types/interfaces
    styles/            # Tailwind base
    config/            # constantes, flags default
    assets/            # imagens estáticas (logo, ícones)
  ```
- **i18n:** **somente PT-BR** (sem estrutura multilíngue no MVP).
- **Licenças/avisos:** MIT para o código do projeto (sugestão).

---


---

## Configuração do Firebase (Setup do Zero)

### Criação de projetos
- `ong-caes-dev` (desenvolvimento)  
- `ong-caes-prod` (produção)  

### Serviços ativados
- **Auth:** email/senha para administradores  
- **Firestore:** banco em `southamerica-east1`  
- **Storage:** bucket em `southamerica-east1` (limite operacional de 5 GB)  
- **Hosting:** servir o PWA  

### Configuração Web (`.env`)
```env
VITE_FB_API_KEY=...
VITE_FB_AUTH_DOMAIN=...
VITE_FB_PROJECT_ID=ong-caes-dev
VITE_FB_STORAGE_BUCKET=ong-caes-dev.appspot.com
VITE_FB_APP_ID=...
```

### Regras iniciais do Firestore
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /dogs/{docId} { allow read: if true; allow write: if request.auth != null && request.auth.token.admin == true; }
    match /posts/{docId} { allow read: if true; allow write: if request.auth != null && request.auth.token.admin == true; }
    match /partners/{docId} { allow read: if true; allow write: if request.auth != null && request.auth.token.admin == true; }
    match /results/{docId} { allow read: if true; allow write: if request.auth != null && request.auth.token.admin == true; }
    match /leads_adoption/{docId} { allow create: if true; allow read, update, delete: if request.auth != null && request.auth.token.admin == true; }
    match /leads_volunteer/{docId} { allow create: if true; allow read, update, delete: if request.auth != null && request.auth.token.admin == true; }
    match /flags/{docId} { allow read: if true; allow write: if request.auth != null && request.auth.token.admin == true; }
    match /settings/{docId} { allow read: if true; allow write: if request.auth != null && request.auth.token.admin == true; }
  }
}
```

### Regras iniciais do Storage
```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /dogs/{dogId}/{allPaths=**} { allow read: if true; allow write: if request.auth != null && request.auth.token.admin == true; }
    match /posts/{postId}/{allPaths=**} { allow read: if true; allow write: if request.auth != null && request.auth.token.admin == true; }
    match /partners/{partnerId}/{allPaths=**} { allow read: if true; allow write: if request.auth != null && request.auth.token.admin == true; }
  }
}
```

### Estrutura de dados inicial (semente)
- `/flags`: `{ adoption: true, donations: true, lostPets: false, partners: true, stories: true, volunteers: true }`  
- `/settings`: `{ contact: "email/whatsapp", pixKey: "chave pix", donationNotes: "texto opcional" }`  
- `/dogs`: 2–3 cães exemplo  
- `/posts`: 2 posts exemplo  
- `/partners`: 2 parceiros exemplo  

## 2) Branding e design de UI (CRIADO)
- **Conceito:** natureza + cuidado. Paleta inspirada em **verde** (confiança/vida), **terra** (acolhimento) e **azul-acqua** (esperança). Contraste AA.
- **Paleta (hex):**
  - Primária: `#2E7D32` (verde ONG) / hover `#27692B`
  - Secundária: `#00A6A6` (acqua) / hover `#008F8F`
  - Acento: `#F59E0B` (apoios/avisos)
  - Sucesso: `#16A34A` | Erro: `#DC2626` | Aviso: `#D97706`
  - Neutros (Slate): `#0F172A` (900), `#334155` (700), `#94A3B8` (400), `#F1F5F9` (50), fundo `#FFFFFF`
- **Tipografia:** **Inter** (UI) e **Merriweather** (títulos opcionais) – via Google Fonts.
- **Componentes base (biblioteca do projeto):**
  - Botão (primário/ghost/link), Input + Label + HelperText, Select, Textarea, Checkbox/Radio, Card, Badge (tags), Modal/Sheet, Navbar, Footer, Banner (doações), Toast, Skeleton, EmptyState.
- **Layout:** Header com logo/CTA “Apoie”; Navbar (condicional às flags); grid de cards 1–2–3 colunas (xs–md–lg); Footer com contatos/PIX.

---

## 3) Itens criados de UI (kits & páginas – PRONTO)
- **Design tokens:** cores, espaçamentos (4/8/12/16px), radius 12–16px, sombras suaves.  
- **Páginas:** 
  - **Início:** hero + CTA, “Ajudamos X animais este mês”, destaques de cães (6).  
  - **Adoção:** lista (filtros: porte, idade, tags), detalhe (galeria até 3 fotos, descrição, CTA).  
  - **Doações:** PIX (chave + QR) e itens prioritários.  
  - **Histórias/Resultados:** feed de posts + contador do mês.  
  - **Parceiros:** logos clicáveis.  
  - **Voluntário/Lar Temporário:** formulário.
- **Admin:** login; **Feature Flags**; CRUD Cães/Posts/Parceiros; Resultados do mês; Leads (listagem/export CSV).

---

## 4) Boas práticas e definições (DEFINIDO)
- **Acessibilidade:** foco visível; labels/aria; contraste AA; navegação por teclado.  
- **Responsividade:** mobile-first; breakpoints Tailwind default.  
- **Desempenho:** LCP ≤ 2.5s; CLS ≤ 0.1; JS inicial ≤ 180KB gzip; imagens **WebP** quando possível; lazy-loading.  
- **Segurança:** regras Firestore/Storage por papel; validação Zod; sanitização básica de HTML nos posts (permitir apenas blocos seguros).  
- **SEO/OG:** metatags por rota; OG image padrão; `sitemap.xml` e `robots.txt`.
- **Adoção de padrões de commit, PR template e lint-staged.**

---

## 5) Firebase – configuração (SEGUIR RECOMENDAÇÕES)
- **Ambientes:** `dev` e `prod` (dois projetos Firebase).  
- **Variáveis (.env):** `VITE_FB_API_KEY`, `VITE_FB_AUTH_DOMAIN`, `VITE_FB_PROJECT_ID`, `VITE_FB_STORAGE_BUCKET`, `VITE_FB_APP_ID`.  
- **Firestore (coleções – mantidas):** `flags`, `dogs`, `posts`, `partners`, `results`, `leads_adoption`, `leads_volunteer`, `settings`.  
- **Índices (exemplos):**
  - `dogs`: `status asc, createdAt desc`, `status asc, size asc`, `status asc, tags asc` (consultas combinadas).  
  - `posts`: `type asc, date desc`.  
  - `partners`: `active asc, name asc`.
- **Regras Firestore (resumo):**
  - Público: `read` limitado nas coleções públicas; leads: `create` liberado; leads `read` somente admin; `flags/settings` apenas admin.  
- **Regras Storage:** `write` só admin; `read` público para imagens publicadas.
- **Sementes (JSON inicial):** `flags` (defaults abaixo), `settings` (PIX + contatos), 3 cães, 2 posts, 2 parceiros.

---

## 6) Modelo de dados e tipos TypeScript (DEFINIDO)
```ts
export type DogSize = 'P' | 'M' | 'G';
export type DogStatus = 'disponível' | 'adotado' | 'indisponível';
export type PostType = 'rescue' | 'care' | 'story';

export interface Dog {
  id: string;
  name: string;
  age: number;            // em anos (frações permitidas)
  size: DogSize;
  tags: string[];         // ex.: ['vacinado','castrado','dócil']
  status: DogStatus;
  description: string;
  photos: string[];       // max 3 URLs
  createdAt: number;      // Timestamp ms
  updatedAt: number;
}

export interface Post {
  id: string;
  type: PostType;
  title: string;
  summary: string;
  body: string;           // texto sanitizado
  photos: string[];       // opcional
  date: number;
}

export interface Partner { id: string; name: string; logoUrl: string; siteUrl: string; active: boolean; }
export interface Result { id: string; helpedCount: number; notes?: string; }
export interface LeadAdoption { id: string; dogId: string; name: string; phone: string; email: string; message: string; createdAt: number; }
export interface LeadVolunteer { id: string; name: string; phone: string; email: string; area: string; createdAt: number; }
export interface Flags { adoption: boolean; donations: boolean; lostPets: boolean; partners: boolean; stories: boolean; volunteers: boolean; }
export interface Settings { contact: string; pixKey: string; donationNotes?: string; }
```

---

## 7) Limites técnicos e alertas (AJUSTADO)
- **Teto de Storage:** **5 GB** (operacional).  
- **Limite por foto (upload):** **máx. 5 MB** (validação no client e no Storage).  
- **Máx. fotos por cão:** **3** (UI e schema reforçam).  
- **Alertas ao admin:** 
  - Se `fotos > 3` → bloquear e exibir mensagem.  
  - Se arquivo > 5 MB → bloquear e sugerir compressão.  
  - **Aviso de quota:** quando estimado **≥ 80%** de 5 GB, banner no Admin (“limpar imagens”/“comprimir”).

---

## 8) Estados de UI, UX writing e criatividade (CRIADO)
- **Estados globais:** `carregando` (skeleton), `vazio` (“Ainda não há registros aqui”), `erro` (“Não foi possível carregar. Tentar novamente?”).  
- **Mensagens de sucesso:** “Recebemos sua mensagem. Em breve a ONG entra em contato.”  
- **Doações:** “Sua ajuda salva vidas. Use a chave PIX abaixo.”  
- **Adoção (empty):** “Nenhum cão disponível no momento. Volte em breve ou torne-se lar temporário.”  
- **Acessibilidade extra:** atalhos – `Esc` fecha modais, `Enter` envia formulários; foco retorna ao botão de origem.  
- **Toasts:** submissões; cópia da chave PIX; alternância de flags.  
- **Banners sazonais:** campanha de ração, mutirão de castração (configurável em `settings`).

---

## 9) Rotas e navegação (FUNCIONAL E SIMPLES)
- **Público:**
  - `/` (Início) • `/adocao` • `/adocao/:id` • `/doacoes` • `/historias` • `/parceiros` • `/voluntario`
- **Admin (protegido por Auth + role):**
  - `/admin` (dashboard) • `/admin/flags` • `/admin/caes` • `/admin/posts` • `/admin/parceiros` • `/admin/leads` • `/admin/resultados`
- **Comportamento de flags:** se seção **off**, esconder menu e **redirigir** rota para `/`.
- **Sitemap/robots:** gerados no build (script).

---

## 10) PWA: Manifest e Service Worker (DEFINIDO)
- **Manifest (exemplo):**
  ```json
  {
    "name": "ONG de Cães",
    "short_name": "ONG Cães",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#2E7D32",
    "icons": [
      {"src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png"},
      {"src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png"},
      {"src": "/icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable any"}
    ]
  }
  ```
- **Service Worker:**
  - **Pré-cache** do shell. **Runtime cache** p/ imagens (Stale-While-Revalidate).  
  - **Dados**: **network-first** com fallback a cache quando possível.  
  - **Atualização:** toast “Nova versão disponível” + botão **Atualizar** (usa `skipWaiting` + `clientsClaim`).

---

## 11) Telemetria e métricas (FEITO)
- **GA4**: `view_dog`, `lead_adoption_sent`, `lead_volunteer_sent`, `pix_copy_click`, `donation_view`.  
- **Sentry (opcional)**: captura de erros em produção.  
- **Relatórios internos**: contagem semanal de leads; `results.helpedCount` mensal.

---

## 12) CI/CD, domínio e ambientes (CRIADO)
- **GitHub Actions**: jobs de `lint`, `typecheck`, `build` e `deploy` (Firebase Hosting).  
- **Preview Channels** por PR para validação da ONG.  
- **Segredos** no repositório para chaves Firebase/GA4/Sentry.  
- **Domínio**: padrão do Firebase inicialmente; customização futura.  
- **Cache headers**: estáticos longos; HTML sem cache.

---

## 13) Administração e operação (DEFINIDO)
- **Onboarding**: criar usuário admin semente (console) e registrar no guia.  
- **Export CSV**: botão nos **Leads** (adoção/voluntário).  
- **Limpeza de órfãos**: rotina mensal (manual) – ver lista de arquivos sem referência.  
- **Backups**: export mensal do Firestore (coleções críticas) + leads CSV.  
- **Guia do Admin**: login, publicar conteúdo, flags, **boas práticas de fotos (≤ 5MB; 3 por cão)**.

---

## 15) Riscos e mitigação (mantido)
- Estouro de Storage (5 GB) → compressão, 5MB por foto, máx. 3 fotos/cão, auditoria mensal.  
- Leituras elevadas → paginação, cache React Query, índices.  
- Conteúdo desatualizado → responsável editorial + calendário.

---

### Pendências mínimas para iniciar repositório
1) **Chave PIX** e texto (`settings`).  
2) **Logo/ícones** (posso gerar placeholders).  
3) **Firebase**: `projectId` dev e prod.  
4) **Contatos** para `settings.contact`.
