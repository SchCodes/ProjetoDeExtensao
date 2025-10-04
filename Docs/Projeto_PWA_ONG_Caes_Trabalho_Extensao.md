PWA para ONG de Cães

**Instituição:** IFPR – Telêmaco Borba  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Modalidade:** Trabalho de Extensão  
**Autoria:** Equipe do Projeto  
**Data:** 2025  

## 1. Resumo / Sumário Executivo
Este documento apresenta o projeto completo de um Progressive Web App (PWA) para uma ONG de proteção animal com foco em cães. O sistema visa ampliar adoções responsáveis, facilitar doações financeiras e de itens, organizar voluntariado e promover transparência dos resultados. A solução adota React (Vite + TypeScript) no front-end e serviços do Firebase (Auth, Firestore, Cloud Storage e Hosting) no back-end, privilegiando baixo custo, simplicidade operacional e escalabilidade.  
O projeto está estruturado em objetivos, escopo, requisitos funcionais e não funcionais, modelagem de dados, arquitetura, configuração do Firebase, diretrizes de design e usabilidade, operação e manutenção, riscos e cronograma, compondo um artefato único pronto para implementação.

## 2. Introdução
Organizações não governamentais que resgatam e acolhem cães dependem de visibilidade, informação confiável e facilidades para captar apoio. Um PWA, por funcionar em qualquer dispositivo e oferecer experiência semelhante à de aplicativo, é adequado a esse contexto. A adoção do Firebase como plataforma gerenciada permite que a equipe concentre esforços no valor social e na operação cotidiana, minimizando a carga de infraestrutura.  
Este projeto acadêmico documenta, de forma clara e verificável, o que será construído, em que ordem e com quais critérios de qualidade, servindo tanto à avaliação acadêmica quanto à execução técnica.

## 3. Objetivos

### 3.1 Objetivo Geral
Desenvolver um PWA que facilite adoções, doações e engajamento comunitário, fornecendo meios simples para gestão de conteúdo pela ONG.

### 3.2 Objetivos Específicos
- Divulgar cães para adoção com informações suficientes para decisão responsável;
- Reduzir barreiras para doações (PIX e itens);
- Organizar manifestações de interesse em voluntariado e lar temporário;
- Oferecer transparência por meio de histórias e resultados mensais;
- Permitir controle administrativo de visibilidade por seções (feature flags).

## 4. Escopo do Projeto

### 4.1 Incluído no MVP
- Páginas públicas: Início, Adoção (lista/detalhe), Doações, Histórias/Resultados, Parceiros, Voluntariado/Lar temporário;
- Admin: Login (Auth), Feature Flags, CRUD Cães/Posts/Parceiros, atualização de Resultados do mês, leitura/exportação de Leads;
- PWA básico: manifest, offline do shell, responsividade, SEO/OG;
- Dados no Firestore; imagens no Cloud Storage (teto operacional de 5 GB).

### 4.2 Fora do Escopo Inicial (Evoluções Futuras)
- Mapa interativo;
- Notificações push;
- Relatórios/dashboards e fluxo de adoção avançado.

## 5. Requisitos Funcionais
- **RF-001** – Home (Início): missão, CTA 'Apoie nossa causa', destaques de cães (até 6), indicador de resultados do mês.
- **RF-002** – Adoção: listagem filtrável por porte (P/M/G), idade e tags; paginação; apenas status 'disponível'.
- **RF-003** – Detalhe do Cão: galeria (até 3 fotos), descrição, atributos, CTA 'Quero Adotar'.
- **RF-004** – Lead de Adoção: formulário com dogId, nome, email, telefone e mensagem (≥ 20 caracteres), persistido em /leads_adoption.
- **RF-005** – Doações: exibir chave PIX e QR quando disponível; lista de itens prioritários; textos de orientação.
- **RF-006** – Histórias/Resultados: feed de /posts (rescue|care|story), exibição de helpedCount de /results/{yyyymm}.
- **RF-007** – Parceiros: logos e links de apoiadores ativos.
- **RF-008** – Voluntariado/Lar Temporário: formulário de interesse persistido em /leads_volunteer.
- **RF-009** – Admin/Autenticação: login via Firebase Auth (e-mail/senha); sessão persistente; logout.
- **RF-010** – Admin/Feature Flags: alternar visibilidade de seções (adoption, donations, lostPets, partners, stories, volunteers).
- **RF-011** – Admin/CRUD Cães: cadastro/edição/remoção, upload de fotos (até 3), status governa visibilidade.
- **RF-012** – Admin/CRUD Posts: type, title, summary, body, photos[], date; ordenação por data desc.
- **RF-013** – Admin/CRUD Parceiros: name, logoUrl, siteUrl, active; validação de URL; toggle ativo.
- **RF-014** – Admin/Resultados: atualizar /results/{yyyymm}.helpedCount e notes; refletir em Home/Histórias.
- **RF-015** – Admin/Leads: listar e exportar CSV de leads de adoção e voluntariado.

## 6. Requisitos Não Funcionais
- **RNF-001** – Acessibilidade: contraste AA, foco visível, navegação por teclado, textos alternativos;
- **RNF-002** – Responsividade: mobile-first e grid fluido;
- **RNF-003** – Desempenho: LCP ≤ 2,5 s (4G), CLS ≤ 0,1, JS inicial ≤ 180 KB gzip; imagens WebP quando possível; lazy-loading;
- **RNF-004** – Segurança: regras de Firestore/Storage por papel; validação e sanitização de entradas;
- **RNF-005** – PWA: manifest, service worker com pré-cache do shell e atualização assistida;
- **RNF-006** – SEO/OG: títulos/descrições por rota, Open Graph, sitemap e robots;
- **RNF-007** – Sustentação de custos: uso consciente de leituras do Firestore; Storage até 5 GB com auditoria mensal.

## 7. Modelagem do Sistema (Descritiva)
Coleções do Firestore:
- /flags (doc único): adoption, donations, lostPets, partners, stories, volunteers — controla visibilidade das seções;
- /dogs/{dogId}: name, age, size (P|M|G), tags[], status (disponível|adotado|indisponível), description, photos[], createdAt, updatedAt;
- /posts/{postId}: type (rescue|care|story), title, summary, body (sanitizado), photos[], date;
- /partners/{partnerId}: name, logoUrl, siteUrl, active;
- /results/{yyyymm}: helpedCount, notes?;
- /leads_adoption/{leadId}: dogId, name, phone, email, message, createdAt;
- /leads_volunteer/{leadId}: name, phone, email, area, createdAt;
- /settings/{docId}: contact, pixKey, donationNotes?.

### 7.1 Limites e Parâmetros Técnicos
- Armazenamento total estimado: 5 GB;
- Máximo por foto: 5 MB;
- Máximo de fotos por cão: 3; bloqueio e mensagem amigável quando excedido;
- Alerta no Admin quando uso estimado do Storage ≥ 80%.

### 7.2 Tipos de Dados (resumo)
- Dog: { id, name, age, size, tags[], status, description, photos[], createdAt, updatedAt }  
- Post: { id, type, title, summary, body, photos[], date }  
- Partner: { id, name, logoUrl, siteUrl, active }  
- Result: { id, helpedCount, notes? }  
- LeadAdoption: { id, dogId, name, phone, email, message, createdAt }  
- LeadVolunteer: { id, name, phone, email, area, createdAt }  
- Flags: { adoption, donations, lostPets, partners, stories, volunteers }  
- Settings: { contact, pixKey, donationNotes? }  

## 8. Arquitetura da Solução

### 8.1 Tecnologias e Componentes
- Front-end: React 18 + Vite + TypeScript, Tailwind CSS, Radix UI, Lucide;
- Back-end (BaaS): Firebase Auth (admins), Firestore (dados), Cloud Storage (imagens), Firebase Hosting (deploy/CDN);
- Gerência de estado: React Query (dados) e Context (flags e sessão admin);
- Formulários e validação: react-hook-form + Zod.

### 8.2 Rotas e Navegação
- Público: /, /adocao, /adocao/:id, /doacoes, /historias, /parceiros, /voluntario;
- Admin: /admin, /admin/flags, /admin/caes, /admin/posts, /admin/parceiros, /admin/leads, /admin/resultados;
- Flags: se uma seção estiver desativada, o item é ocultado e a rota redireciona para /. 

### 8.3 PWA (Manifest + Service Worker)
- Manifest com name, short_name, ícones 192/512, theme/background, display=standalone;
- Service Worker com pré-cache do shell, runtime cache para imagens (Stale-While-Revalidate) e estratégia network-first para dados;
- Atualização assistida: aviso 'Nova versão disponível' com ação de atualizar.

## 9. Configuração do Firebase (Setup do Zero)

### 9.1 Criação de Projetos
- ong-caes-dev (desenvolvimento)  
- ong-caes-prod (produção)  

### 9.2 Serviços Ativados
- Authentication: e-mail/senha para administradores;
- Firestore Database: região recomendada southamerica-east1;
- Cloud Storage: bucket em southamerica-east1 (teto operacional 5 GB);
- Hosting: publicação do PWA.

### 9.3 Configuração Web (.env)
Variáveis mínimas: VITE_FB_API_KEY, VITE_FB_AUTH_DOMAIN, VITE_FB_PROJECT_ID, VITE_FB_STORAGE_BUCKET, VITE_FB_APP_ID.

### 9.4 Regras Iniciais do Firestore (resumo textual)
- Leitura pública: dogs, posts, partners, results;
- Leads: criação pública; leitura/atualização/exclusão apenas por admin;
- Flags e settings: leitura pública; escrita apenas por admin.

### 9.5 Regras Iniciais do Storage (resumo textual)
- Leitura pública dos objetos publicados;
- Escrita apenas por usuários autenticados com papel admin nas pastas dogs/, posts/ e partners/.

### 9.6 Estrutura de Dados Inicial (Semente)
- /flags: { adoption: true, donations: true, lostPets: false, partners: true, stories: true, volunteers: true };
- /settings: { contact: 'email/whatsapp', pixKey: 'chave pix', donationNotes?: 'texto' };
- /dogs: cadastrar 2–3 exemplos; /posts: 2 exemplos; /partners: 2 exemplos.

## 10. Design e Usabilidade

### 10.1 Branding e Identidade Visual
- Conceito: natureza e cuidado; paleta com verde (#2E7D32), acqua (#00A6A6) e acento laranja (#F59E0B); neutros Slate;
- Tipografia: Inter (UI) e Merriweather (títulos).

### 10.2 Componentes e Padrões de UI
- Botões (primário/ghost/link), Inputs/Labels, Select, Textarea, Checkbox/Radio, Cards, Badges (tags), Modais, Navbar, Footer, Toasts, Skeleton, EmptyState;
- Mensagens padrões de sucesso/erro, estados de carregamento e vazios significativos;
- Acessibilidade: labels e aria-*, foco visível, atalhos (Esc para fechar modais, Enter para enviar).

## 11. Operação e Manutenção
- Onboarding do administrador: criar usuário semente via console;
- Exportação CSV de leads;
- Backup mensal das coleções críticas e download dos CSV;
- Limpeza mensal de imagens órfãs e auditoria de uso do Storage;
- Métricas: GA4 para eventos (view_dog, lead_*), Sentry opcional para erros.

## 12. Riscos e Mitigações
- Estouro do Storage (5 GB): compressão, limite de 5 MB por imagem e até 3 fotos por cão, auditoria mensal;
- Leituras excessivas do Firestore: paginação, cache no cliente (React Query) e índices;
- Conteúdo desatualizado: responsável editorial e calendário de revisão.

## 13. Cronograma / Roadmap
- **M1** – Prototipação e modelo de dados;
- **M2** – Páginas públicas (Início, Adoção, Doações, Histórias, Parceiros, Voluntário);
- **M3** – Admin (login, flags, CRUDs, leads, resultados);
- **M4** – PWA (offline básico) e SEO/OG;
- **M5** – Testes finais e publicação (Hosting).  
Pós-MVP: mapa interativo, notificações push, relatórios/dashboards e fluxo de adoção avançado.

## 14. Conclusão
O projeto consolida requisitos, arquitetura e operação de um PWA voltado a ampliar o impacto de uma ONG de cães. Com tecnologia acessível e de baixo custo, privilegia-se a entrega rápida e a governança simples do conteúdo, mantendo um caminho de evolução para recursos mais sofisticados.

## 15. Anexos (Exemplos Textuais)
```json
{ "name": "Luna", "age": 3, "size": "M", "tags": ["vacinado","dócil"], "status": "disponível", "description": "Resgatada, ótima com crianças.", "photos": ["https://.../dogs/123/photo_1.jpg"], "createdAt": "", "updatedAt": "" }

{ "dogId": "123", "name": "João Silva", "phone": "(43) 99999-9999", "email": "joao@email.com", "message": "Quero conhecer a Luna.", "createdAt": "" }

{ "adoption": true, "donations": true, "lostPets": false, "partners": true, "stories": true, "volunteers": true }
```