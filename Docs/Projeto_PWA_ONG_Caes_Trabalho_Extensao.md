# PROJETO PWA – ONG DE CÃES (TRABALHO DE EXTENSÃO)
**Versão:** 1.1 (ajustes com setup Firebase do zero)  
**Idioma:** pt-BR

---

## 0) Visão Geral
Mantém-se a visão de construir um **PWA em React** com integração **Firebase (Auth, Firestore, Storage, Hosting)**, voltado à adoção e doação de cães.

---

## 1) Stack e Padrões
- **Framework:** React 18 + Vite + TypeScript.  
- **UI:** Tailwind CSS + Radix UI + Lucide (ícones).  
- **Estado:** React Query + Context.  
- **Validação:** Zod + react-hook-form.  
- **Padrões:** ESLint + Prettier + Husky + Commitlint.  
- **Idioma:** apenas PT-BR.

---

## 2) Branding e UI
- Paleta: verde (#2E7D32), acqua (#00A6A6), acento laranja (#F59E0B), neutros Slate.  
- Tipografia: Inter (UI), Merriweather (títulos).  
- Componentes base: botões, inputs, selects, cards, modais, navbar, footer, toasts, skeletons, empty states.  
- Layout: header + navbar condicional, grid responsivo, footer com contatos/PIX.

---

## 3) Firebase – Setup do Zero
### 3.1 Criação de projetos
- `ong-caes-dev` (desenvolvimento).  
- `ong-caes-prod` (produção).  

### 3.2 Serviços ativados
- **Auth:** Email/Senha (admins).  
- **Firestore:** banco em `southamerica-east1`.  
- **Storage:** bucket em `southamerica-east1` (limite 5 GB).  
- **Hosting:** servir o PWA.  

### 3.3 Configuração Web
Após criar o app web no Firebase, preencher `.env`:
```
VITE_FB_API_KEY=...
VITE_FB_AUTH_DOMAIN=...
VITE_FB_PROJECT_ID=ong-caes-dev
VITE_FB_STORAGE_BUCKET=ong-caes-dev.appspot.com
VITE_FB_APP_ID=...
```

### 3.4 Regras iniciais (Firestore)
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /dogs/{docId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    match /posts/{docId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    match /partners/{docId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    match /results/{docId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    match /leads_adoption/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null && request.auth.token.admin == true;
    }
    match /leads_volunteer/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null && request.auth.token.admin == true;
    }
    match /flags/{docId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    match /settings/{docId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### 3.5 Regras iniciais (Storage)
```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /dogs/{dogId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    match /posts/{postId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    match /partners/{partnerId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### 3.6 Estrutura de dados inicial (semente)
- `/flags`: { adoption: true, donations: true, lostPets: false, partners: true, stories: true, volunteers: true }  
- `/settings`: { contact: "email/whatsapp", pixKey: "chave pix", donationNotes: "mensagem opcional" }  
- `/dogs`: inserir 2–3 cães exemplo.  
- `/posts`: inserir 2 posts exemplo.  
- `/partners`: inserir 2 parceiros exemplo.

---

## 4) Limites técnicos
- **Storage:** 5 GB.  
- **Foto:** máx. 5 MB; até 3 por cão.  
- **Aviso admin:** alerta em 80% de uso de quota.  

---

## 5) Rotas e Navegação
- Público: `/`, `/adocao`, `/adocao/:id`, `/doacoes`, `/historias`, `/parceiros`, `/voluntario`.  
- Admin: `/admin`, `/admin/flags`, `/admin/caes`, `/admin/posts`, `/admin/parceiros`, `/admin/leads`, `/admin/resultados`.  
- Se flag=false → esconder do menu + redirecionar rota → `/`.  

---

## 6) PWA
- **Manifest.json:** nome, short_name, cores, ícones (192/512), maskable.  
- **Service Worker:** pré-cache shell, runtime cache imagens (Stale-While-Revalidate), network-first para dados, aviso de atualização.

---

## 7) Telemetria
- **GA4:** eventos view_dog, lead_adoption_sent, lead_volunteer_sent, pix_copy_click, donation_view.  
- **Sentry (opcional):** captura de erros.  

---

## 8) CI/CD
- **GitHub Actions:** lint + typecheck + build + deploy (Firebase Hosting).  
- **Preview Channels:** revisão da ONG a cada PR.  
- **Domínio:** padrão Firebase no início; opção de custom posterior.

---

## 9) Administração
- **Onboarding:** criar admin semente (console).  
- **CSV export:** leads de adoção/voluntário.  
- **Backups:** export Firestore mensal; leads CSV.  
- **Limpeza Storage:** rotina manual/mensal para órfãos.  
- **Guia rápido:** login, publicar cães/posts, editar flags, boas práticas (≤5MB; 3 fotos).

---

## 10) Roadmap (MVP)
- **M1:** protótipo + modelo de dados.  
- **M2:** páginas públicas.  
- **M3:** admin completo.  
- **M4:** PWA + SEO.  
- **M5:** testes e deploy.  

**Pós-MVP:** mapa, push, relatórios, fluxo de adoção avançado.
