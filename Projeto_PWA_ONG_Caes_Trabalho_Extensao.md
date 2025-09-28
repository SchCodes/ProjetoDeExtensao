# PROJETO PWA – ONG DE CÃES (TRABALHO DE EXTENSÃO)

**Arquivo:** `especificacao_projeto.md`  
**Versão:** 0.9 (rascunho colaborativo)  
**Status:** Em construção

---

## Sumário
1. [Visão Geral](#visão-geral)  
2. [Escopo](#escopo)  
3. [Papéis e Perfis de Acesso](#papéis-e-perfis-de-acesso)  
4. [Requisitos Funcionais (detalhados)](#requisitos-funcionais-detalhados)  
5. [Requisitos Não Funcionais (detalhados)](#requisitos-não-funcionais-detalhados)  
6. [Modelo de Dados – descritivo](#modelo-de-dados-descritivo)  
7. [Regras de Segurança – rascunho textual](#regras-de-segurança-rascunho-textual)  
8. [Arquitetura de Informação (sitemap) – textual](#arquitetura-de-informação-sitemap-textual)  
9. [Fluxos de Uso (User Stories + Cenários)](#fluxos-de-uso-user-stories--cenários)  
10. [PWA (Manifest + Service Worker) – parâmetros](#pwa-manifest--service-worker--parâmetros)  
11. [Acessibilidade e SEO – parâmetros](#acessibilidade-e-seo--parâmetros)  
12. [Desempenho (Performance Budget) – parâmetros](#desempenho-performance-budget--parâmetros)  
13. [Plano de Testes (casos e critérios de aceite) – detalhado](#plano-de-testes-casos-e-critérios-de-aceite--detalhado)  
14. [Operação (deploy, backups, limpeza de storage, métricas) – runbook](#operação-deploy-backups-limpeza-de-storage-métricas--runbook)  
15. [Riscos e Mitigações](#riscos-e-mitigações)  
16. [Roadmap e Marcos](#roadmap-e-marcos)  
17. [Glossário (conceitos, parâmetros, métodos)](#glossário-conceitos-parâmetros-métodos)  
18. [Anexos (exemplos JSON)](#anexos-exemplos-json)

---

## Visão Geral
**Objetivo geral:** Construir um Progressive Web App (PWA) para uma ONG de proteção animal com foco em cães, priorizando **adoção**, **doações** (financeiras e itens), **histórias/resultados**, **parceiros** e **voluntariado/lar temporário**.

**Resumo técnico:**
- **Front-end:** React ou Next.js com PWA (manifest + service worker).  
- **Back-end (BaaS):** Firebase Auth (admins), Firestore (dados), Cloud Storage (imagens, até **5 GB**), Firebase Hosting (deploy/CDN).  
- **Administração:** painel com **feature flags** (liga/desliga por seção), **CRUD** de conteúdo e **consulta/exportação de leads**.

**Resultado esperado (MVP):** Plataforma simples, estável e econômica, com governança de conteúdo pela ONG e espaço para evoluções futuras (mapa, push, relatórios).

---

## Escopo
**Incluído no MVP**
- Páginas públicas: Início, **Adoção** (lista/detalhe), **Doações**, **Histórias/Resultados**, **Parceiros**, **Voluntariado/Lar temporário**.  
- Admin: Login (Auth), **Feature Flags**, **CRUD** Cães/Posts/Parceiros, atualização do indicador “ajudamos X animais este mês”, leitura/exportação de leads.  
- **PWA básico:** manifest, offline do shell, responsividade, SEO/OG.  
- **Dados:** Firestore; **Imagens:** Cloud Storage (**5 GB**).

**Fora do MVP (elegível a evolução)**
- **Mapa interativo**; **notificações push**; **relatórios/dashboards**; **fluxo de adoção avançado** (triagem, termos, anexos).

**Não escopo**
- Integrações pagas/complexas não essenciais ao MVP.

---

## Papéis e Perfis de Acesso
**Perfis**
- **Visitante:** navega no conteúdo público; envia leads (adoção/voluntariado).  
- **Administrador:** autentica via Firebase Auth; gerencia dados e flags.

**Permissões resumidas**
- **Visitante:** leitura de coleções públicas; criação de leads.  
- **Administrador:** leitura/escrita nas coleções de conteúdo; leitura de leads; alteração de flags e configurações.

---

## Requisitos Funcionais (detalhados)

### RF-001 — Home (Início)
**Descrição:** Página inicial com missão, CTA “Apoie nossa causa”, destaques de cães e indicador de resultados do mês.  
**Elementos mínimos:** título/hero + CTAs; bloco “Conseguimos ajudar X animais este mês”; 3–6 cards de cães.  
**Parâmetros:** `Qtd_destaques_home` (int, default = 6).  
**Aceite:** indicador aparece quando existir `/results/{yyyymm}`; ordenação por `createdAt desc`; paginação/limite respeitados.

### RF-002 — Listagem de Cães (Adoção)
**Descrição:** Catálogo com filtros e paginação.  
**Filtros:** `size` (P|M|G), faixas de idade, `tags` (ex.: vacinado, castrado), `status="disponível"`.  
**Parâmetros:** `page_size` (default 12), `order_by=createdAt desc`.  
**Aceite:** filtros aplicados com índices; contador e empty state.

### RF-003 — Detalhe do Cão
**Descrição:** Galeria, descrição, atributos e CTA “Quero Adotar”.  
**Parâmetros:** `max_photos_por_cao` (default 8).  
**Aceite:** lazy-loading; fallback sem fotos; CTA abre RF-004.

### RF-004 — Lead de Adoção
**Descrição:** Formulário de interesse.  
**Campos obrigatórios:** `dogId` (hidden), `nome`, `email`, `telefone`, `mensagem` (≥ 20 chars).  
**Validação:** e-mail válido; máscara de telefone; mensagem mínima.  
**Persistência:** `/leads_adoption/{leadId}` (`createdAt`).  
**Aceite:** confirmação de envio; debounce/anti-spam simples.

### RF-005 — Doações (PIX) e Itens
**Descrição:** Instruções de doação financeira (PIX) e lista de itens prioritários.  
**Parâmetros:** `settings.pixKey`, `settings.donationNotes`.  
**Aceite:** exibir chave/QR quando disponível; fallback textual; lista de itens editável pelo Admin.

### RF-006 — Histórias/Resultados
**Descrição:** Relatos de resgates/atendimentos e histórias de sucesso.  
**Dados:** `/posts` (`type: rescue|care|story`), `/results/{yyyymm}` (`helpedCount`).  
**Aceite:** ordenação por `date desc`; exibe `helpedCount` do mês.

### RF-007 — Parceiros
**Descrição:** Vitrine de apoiadores.  
**Dados:** `/partners` (`active=true`).  
**Aceite:** logos otimizadas; link em nova aba; ocultar inativos.

### RF-008 — Voluntariado/Lar temporário
**Descrição:** Formulário de interesse.  
**Campos:** `nome`, `email`, `telefone`, `area` (transporte|lar temporário|divulgação|outros), `mensagem?`.  
**Persistência:** `/leads_volunteer/{leadId}`.  
**Aceite:** confirmação; honeypot e time-to-submit.

### RF-009 — Admin: Autenticação
**Descrição:** Login via Firebase Auth (e-mail/senha ou provedor).  
**Aceite:** sessão persistente; logout; mensagens de erro claras.

### RF-010 — Admin: Feature Flags (liga/desliga)
**Descrição:** Alternar visibilidade de seções públicas.  
**Dados:** `/flags` doc único `{ adoption, donations, lostPets, partners, stories, volunteers }`.  
**Regra:** se `flag=false`, esconder menu/rotas (fallback: 404 → home).  
**Aceite:** persistência imediata; UI pública reflete em ≤ 1 min (cache).

### RF-011 — Admin: CRUD Cães
**Campos mínimos:** `name`, `age`, `size`, `tags[]`, `status`, `description`, `photos[]`.  
**Regras:** upload no Storage; salvar URLs em `photos[]`; `status` governa visibilidade.  
**Aceite:** validações completas; limpeza de imagens órfãs.

### RF-012 — Admin: CRUD Posts
**Campos:** `type`, `title`, `summary`, `body`, `photos[]`, `date`.  
**Aceite:** editor básico; `date desc`.

### RF-013 — Admin: CRUD Parceiros
**Campos:** `name`, `logoUrl`, `siteUrl`, `active`.  
**Aceite:** validação de URL; toggle `active`.

### RF-014 — Admin: Resultados do mês
**Campos:** `/results/{yyyymm}.helpedCount (int>=0)`, `notes?`.  
**Aceite:** exibir em Home/Histórias quando existir doc referente ao mês.

### RF-015 — Admin: Leads
**Descrição:** Listagem e exportação (CSV) de leads de adoção/voluntariado.  
**Aceite:** `createdAt desc`; filtros por período; export CSV.

---

## Requisitos Não Funcionais (detalhados)

### RNF-001 — PWA
- **Manifest:** `name`, `short_name`, ícones 192/512, `display=standalone`, `theme/background`.  
- **Service Worker:** cache do shell; `network-first` para dados; atualização com `skipWaiting` controlado.

### RNF-002 — Acessibilidade
- ALT text, contraste **AA**, foco visível, navegação por teclado.

### RNF-003 — Desempenho
- **LCP ≤ 2.5 s (4G)**; **CLS ≤ 0.1**; JS inicial **≤ 180 KB gzip**; imagens com **lazy-loading**.

### RNF-004 — Segurança
- Regras Firestore/Storage por papel; validação de entrada; limites de taxa.

### RNF-005 — SEO/OG
- Títulos únicos; `meta description`; **Open Graph** por rota; `sitemap.xml`, `robots.txt`.

### RNF-006 — Responsividade
- Mobile-first; grid fluido; alvos de toque ≥ 44px.

### RNF-007 — Sustentação de custos
- **Storage até 5 GB**; auditoria mensal; compressão e limpeza.

---

## Modelo de Dados (descritivo)
- **/flags (doc único):** `adoption`, `donations`, `lostPets`, `partners`, `stories`, `volunteers`.  
- **/dogs/{dogId}:** `name`, `age`, `size (P|M|G)`, `tags[]`, `status`, `description`, `photos[]`, `createdAt`, `updatedAt`.  
- **/posts/{postId}:** `type (rescue|care|story)`, `title`, `summary`, `body`, `photos[]`, `date`.  
- **/partners/{partnerId}:** `name`, `logoUrl`, `siteUrl`, `active`.  
- **/results/{yyyymm}:** `helpedCount`, `notes?`.  
- **/leads_adoption/{leadId}:** `dogId`, `name`, `phone`, `email`, `message`, `createdAt`.  
- **/leads_volunteer/{leadId}:** `name`, `phone`, `email`, `area`, `createdAt`.  
- **/settings/{docId}:** `contact`, `pixKey`, `donationNotes`.

**Cloud Storage (limite 5 GB):**
```
/dogs/{dogId}/photo_{n}.jpg
/posts/{postId}/photo_{n}.jpg
/partners/{partnerId}/logo.jpg
```
**Boas práticas:** compressão no upload; limite por arquivo (ex.: 1 MB); limpeza de órfãos.

---

## Regras de Segurança (rascunho textual)

**Firestore**
- Público: `read` apenas em coleções públicas com filtros/paginação.  
- Leads: `create` permitido sem auth; `read` apenas admin.  
- Admin: `read/write` em coleções de conteúdo; `update` em `/flags` e `/settings`.  
- Todas as gravações registram `createdAt/updatedAt` (serverTimestamp).

**Storage**
- `write`: apenas admin em `/dogs`, `/posts`, `/partners`.  
- `read`: público apenas para objetos publicados (regras/ACLs).

---

## Arquitetura de Informação (sitemap textual)
- `/` (Início)  
- `/adocao` → `/adocao/:id`  
- `/doacoes`  
- `/historias`  
- `/parceiros`  
- `/voluntario`  
- `/admin` (login) → dashboard, flags, cães, posts, parceiros, leads

---

## Fluxos de Uso (User Stories + Cenários)

**US-001** — Como visitante, quero ver cães disponíveis para escolher um candidato à adoção.  
**Cenários:** filtro por porte/idade; lista vazia com mensagem orientativa.

**US-002** — Como visitante, quero manifestar interesse em adotar um cão para iniciar contato.  
**Cenários:** formulário válido cria lead e confirma; inválido mostra erros claros.

**US-003** — Como visitante, quero doar via PIX para apoiar a ONG.  
**Cenários:** PIX visível quando `settings.pixKey` presente; fallback quando ausente.

**US-004** — Como admin, quero ativar/desativar seções para ajustar o site.  
**Cenários:** ao desligar `partners`, menu/rota somem da navegação pública.

**US-005** — Como admin, quero cadastrar/editar cães, posts e parceiros.  
**Cenários:** upload atualiza Storage e URLs; exclusão remove/agenda limpeza.

**US-006** — Como admin, quero ver e exportar leads para contato.  
**Cenários:** filtro por período; exportação CSV disponível.

---

## PWA (Manifest + Service Worker) – parâmetros

**Manifest (mínimo):**
```json
{
  "name": "ONG de Cães",
  "short_name": "ONG Cães",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1e293b",
  "icons": [
    {"src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png"}
  ]
}
```

**Service Worker (ideia):**
- Pré-cache do shell; runtime cache para imagens.  
- Estratégia `network-first` para dados.  
- Atualização: aviso de “nova versão disponível” + botão **Atualizar**.

---

## Acessibilidade e SEO – parâmetros

**Acessibilidade**  
Labels explícitas; atributos `aria-*` quando necessário; foco visível; navegação por teclado; mensagens de erro vinculadas aos campos.

**SEO/OG**  
Title/description por página; OG image por rota principal; `sitemap.xml`, `robots.txt`; `canonical` quando aplicável.

---

## Desempenho (Performance Budget) – parâmetros
- **LCP ≤ 2.5 s (4G)**; **CLS ≤ 0.1**; TBT reduzido nas páginas principais.  
- **JS inicial ≤ 180 KB gzip**; imagens ≤ 120 KB (lista) e ≤ 300 KB (detalhe).  
- **Lazy-loading** para imagens fora de viewport; compressão **WebP/JPEG**.

---

## Plano de Testes (casos e critérios de aceite) – detalhado

**Funcionais (amostra)**
- `T-ADOC-01`: Filtro por porte retorna apenas cães com `size` condizente. **Aceite:** ✔  
- `T-ADOC-02`: Lead inválido (e-mail) bloqueia envio. **Aceite:** ✔ mensagem clara  
- `T-ADM-01`: `partners=false` oculta rota/menu. **Aceite:** ✔ em ≤ 60s

**PWA**
- `T-PWA-01`: Instalável em Android/Chrome. **Aceite:** ✔  
- `T-PWA-02`: Offline do shell exibe páginas básicas com fallback. **Aceite:** ✔

**Acessibilidade**
- `T-A11Y-01`: Navegação por teclado 100% funcional. **Aceite:** ✔

**Desempenho**
- `T-PERF-01`: Home LCP ≤ 2.5 s em 4G simulado. **Aceite:** ✔

**Segurança**
- `T-SEC-01`: Visitante não lê leads; admin lê. **Aceite:** ✔

---

## Operação (deploy, backups, limpeza de storage, métricas) – runbook
**Deploy:** CI/CD (GitHub Actions) → Firebase Hosting; **preview channels** para QA.  
**Backups:** exportação periódica de leads e coleções críticas (mensal/semanal).  
**Limpeza de Storage:** rotina mensal para remover órfãos e comprimir imagens.  
**Métricas:** visitas, leads criados, adoções (manual), doações.  
**Suporte:** guia rápido para admins; checklist editorial.

---

## Riscos e Mitigações
- Estouro do Storage (5 GB) → compressão, limite por imagem, limpeza/rotação.  
- Leituras excessivas → paginação, cache local e índices.  
- Conteúdo desatualizado → responsável editorial e calendário de revisão.

---

## Roadmap e Marcos
- **M1:** Prototipação e modelo de dados aprovados.  
- **M2:** Páginas públicas completas.  
- **M3:** Admin (login, flags, CRUDs, leads) completo.  
- **M4:** PWA (offline básico) e SEO/OG prontos.  
- **M5:** Testes finais e publicação (produção).

**Pós-MVP:** mapa interativo; notificações push; relatórios; fluxo de adoção avançado.

---

## Glossário (conceitos, parâmetros, métodos)
- **PWA:** Aplicação web com recursos de app (instalável, offline parcial).  
- **Feature Flag:** parâmetro booleano que liga/desliga uma seção/funcionalidade.  
- **Lead:** registro de interesse (adoção/voluntariado) criado por visitante.  
- **Firestore:** banco NoSQL do Firebase; coleções/documentos indexados.  
- **Cloud Storage:** armazenamento de arquivos (imagens) – limite 5 GB.  
- **Auth:** autenticação de usuários (administradores).  
- **page_size:** número de itens por página (paginação).  
- **LCP/CLS/TBT:** métricas Core Web Vitals.  
- **OG (Open Graph):** metadados para cartões sociais.  
- **CSV:** formato de exportação de dados tabulares.

---

## Anexos (exemplos JSON)

### /dogs/{dogId}
```json
{
  "name": "Luna",
  "age": 3,
  "size": "M",
  "tags": ["vacinado", "dócil"],
  "status": "disponível",
  "description": "Resgatada, ótima com crianças.",
  "photos": ["https://.../dogs/123/photo_1.jpg"],
  "createdAt": "<serverTimestamp>",
  "updatedAt": "<serverTimestamp>"
}
```

### /leads_adoption/{leadId}
```json
{
  "dogId": "123",
  "name": "João Silva",
  "phone": "(43) 99999-9999",
  "email": "joao@email.com",
  "message": "Quero conhecer a Luna.",
  "createdAt": "<serverTimestamp>"
}
```

### /flags (doc único)
```json
{
  "adoption": true,
  "donations": true,
  "lostPets": false,
  "partners": true,
  "stories": true,
  "volunteers": true
}
```

---
