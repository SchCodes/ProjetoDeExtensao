# PWA para ONG de CÃ£es

**InstituiÃ§Ã£o:** IFPR â€“ TelÃªmaco Borba  
**Curso:** AnÃ¡lise e Desenvolvimento de Sistemas  
**Modalidade:** Trabalho de ExtensÃ£o  
**Autoria:** Equipe do Projeto  
**Data:** 2025  

## 1. Resumo / SumÃ¡rio Executivo
Este documento apresenta o projeto completo de um Progressive Web App (PWA) para uma ONG de proteÃ§Ã£o animal com foco em cÃ£es. O sistema visa ampliar adoÃ§Ãµes responsÃ¡veis, facilitar doaÃ§Ãµes financeiras e de itens, organizar voluntariado e promover transparÃªncia dos resultados. A soluÃ§Ã£o adota React (Vite + TypeScript) no frontâ€‘end e serviÃ§os do Firebase (Auth, Firestore, Cloud Storage e Hosting) no backâ€‘end, privilegiando baixo custo, simplicidade operacional e escalabilidade.  
O projeto estÃ¡ estruturado em objetivos, escopo, requisitos funcionais e nÃ£o funcionais, modelagem de dados, arquitetura, configuraÃ§Ã£o do Firebase, diretrizes de design e usabilidade, operaÃ§Ã£o e manutenÃ§Ã£o, riscos e cronograma, compondo um artefato Ãºnico pronto para implementaÃ§Ã£o.

## 2. IntroduÃ§Ã£o
OrganizaÃ§Ãµes nÃ£o governamentais que resgatam e acolhem cÃ£es dependem de visibilidade, informaÃ§Ã£o confiÃ¡vel e facilidades para captar apoio. Um PWA, por funcionar em qualquer dispositivo e oferecer experiÃªncia semelhante Ã  de aplicativo, Ã© adequado a esse contexto. A adoÃ§Ã£o do Firebase como plataforma gerenciada permite que a equipe concentre esforÃ§os no valor social e na operaÃ§Ã£o cotidiana, minimizando a carga de infraestrutura.  
Este projeto acadÃªmico documenta, de forma clara e verificÃ¡vel, o que serÃ¡ construÃ­do, em que ordem e com quais critÃ©rios de qualidade, servindo tanto Ã  avaliaÃ§Ã£o acadÃªmica quanto Ã  execuÃ§Ã£o tÃ©cnica.

## 3. Objetivos

### 3.1 Objetivo Geral
Desenvolver um PWA que facilite adoÃ§Ãµes, doaÃ§Ãµes e engajamento comunitÃ¡rio, fornecendo meios simples para gestÃ£o de conteÃºdo pela ONG.

### 3.2 Objetivos EspecÃ­ficos
- Divulgar cÃ£es para adoÃ§Ã£o com informaÃ§Ãµes suficientes para decisÃ£o responsÃ¡vel;
- Reduzir barreiras para doaÃ§Ãµes (PIX e itens);
- Organizar manifestaÃ§Ãµes de interesse em voluntariado e lar temporÃ¡rio;
- Oferecer transparÃªncia por meio de histÃ³rias e resultados mensais;
- Permitir controle administrativo de visibilidade por seÃ§Ãµes (feature flags).

## 4. Escopo do Projeto

### 4.1 IncluÃ­do no MVP
- PÃ¡ginas pÃºblicas: InÃ­cio, AdoÃ§Ã£o (lista/detalhe), DoaÃ§Ãµes, HistÃ³rias/Resultados, Parceiros, Voluntariado/Lar temporÃ¡rio;
- Admin: Login (Auth), Feature Flags, CRUD CÃ£es/Posts/Parceiros, atualizaÃ§Ã£o de Resultados do mÃªs, leitura/exportaÃ§Ã£o de Leads;
- PWA bÃ¡sico: manifest, offline do shell, responsividade, SEO/OG;
- Dados no Firestore; imagens no Cloud Storage (teto operacional de 5 GB).

### 4.2 Fora do Escopo Inicial (EvoluÃ§Ãµes Futuras)
- Mapa interativo;
- NotificaÃ§Ãµes push;
- RelatÃ³rios/dashboards e fluxo de adoÃ§Ã£o avanÃ§ado.

## 5. Requisitos Funcionais
- **RFâ€‘001** â€“ Home (InÃ­cio): missÃ£o, CTA â€™Apoie nossa causaâ€™, destaques de cÃ£es (atÃ© 6), indicador de resultados do mÃªs.
- **RFâ€‘002** â€“ AdoÃ§Ã£o: listagem filtrÃ¡vel por porte (P/M/G), idade e tags; paginaÃ§Ã£o; apenas status â€™disponÃ­velâ€™.
- **RFâ€‘003** â€“ Detalhe do CÃ£o: galeria (atÃ© 3 fotos), descriÃ§Ã£o, atributos, CTA â€™Quero Adotarâ€™.
- **RFâ€‘004** â€“ Lead de AdoÃ§Ã£o: formulÃ¡rio com dogId, nome, email, telefone e mensagem (â‰¥ 20 caracteres), persistido em /leads_adoption.
- **RFâ€‘005** â€“ DoaÃ§Ãµes: exibir chave PIX e QR quando disponÃ­vel; lista de itens prioritÃ¡rios; textos de orientaÃ§Ã£o.
- **RFâ€‘006** â€“ HistÃ³rias/Resultados: feed de /posts (rescue|care|story), exibiÃ§Ã£o de helpedCount de /results/{yyyymm}.
- **RFâ€‘007** â€“ Parceiros: logos e links de apoiadores ativos.
- **RFâ€‘008** â€“ Voluntariado/Lar TemporÃ¡rio: formulÃ¡rio de interesse persistido em /leads_volunteer.
- **RFâ€‘009** â€“ Admin/AutenticaÃ§Ã£o: login via Firebase Auth (eâ€‘mail/senha); sessÃ£o persistente; logout.
- **RFâ€‘010** â€“ Admin/Feature Flags: alternar visibilidade de seÃ§Ãµes (adoption, donations, lostPets, partners, stories, volunteers).
- **RFâ€‘011** â€“ Admin/CRUD CÃ£es: cadastro/ediÃ§Ã£o/remoÃ§Ã£o, upload de fotos (atÃ© 3), status governa visibilidade.
- **RFâ€‘012** â€“ Admin/CRUD Posts: type, title, summary, body, photos[], date; ordenaÃ§Ã£o por data desc.
- **RFâ€‘013** â€“ Admin/CRUD Parceiros: name, logoUrl, siteUrl, active; validaÃ§Ã£o de URL; toggle ativo.
- **RFâ€‘014** â€“ Admin/Resultados: atualizar /results/{yyyymm}.helpedCount e notes; refletir em Home/HistÃ³rias.
- **RFâ€‘015** â€“ Admin/Leads: listar e exportar CSV de leads de adoÃ§Ã£o e voluntariado.

## 6. Requisitos NÃ£o Funcionais
- **RNFâ€‘001** â€“ Acessibilidade: contraste AA, foco visÃ­vel, navegaÃ§Ã£o por teclado, textos alternativos;
- **RNFâ€‘002** â€“ Responsividade: mobileâ€‘first e grid fluido;
- **RNFâ€‘003** â€“ Desempenho: LCP â‰¤ 2,5 s (4G), CLS â‰¤ 0,1, JS inicial â‰¤ 180 KB gzip; imagens WebP quando possÃ­vel; lazyâ€‘loading;
- **RNFâ€‘004** â€“ SeguranÃ§a: regras de Firestore/Storage por papel; validaÃ§Ã£o e sanitizaÃ§Ã£o de entradas;
- **RNFâ€‘005** â€“ PWA: manifest, service worker com prÃ©â€‘cache do shell e atualizaÃ§Ã£o assistida;
- **RNFâ€‘006** â€“ SEO/OG: tÃ­tulos/descriÃ§Ãµes por rota, Open Graph, sitemap e robots;
- **RNFâ€‘007** â€“ SustentaÃ§Ã£o de custos: uso consciente de leituras do Firestore; Storage atÃ© 5 GB com auditoria mensal.

## 7. Modelagem do Sistema (Descritiva)
ColeÃ§Ãµes do Firestore:
- /flags (doc Ãºnico): adoption, donations, lostPets, partners, stories, volunteers â€” controla visibilidade das seÃ§Ãµes;
- /dogs/{dogId}: name, age, size (P|M|G), tags[], status (disponÃ­vel|adotado|indisponÃ­vel), description, photos[], createdAt, updatedAt;
- /posts/{postId}: type (rescue|care|story), title, summary, body (sanitizado), photos[], date;
- /partners/{partnerId}: name, logoUrl, siteUrl, active;
- /results/{yyyymm}: helpedCount, notes?;
- /leads_adoption/{leadId}: dogId, name, phone, email, message, createdAt;
- /leads_volunteer/{leadId}: name, phone, email, area, createdAt;
- /settings/{docId}: contact, pixKey, donationNotes?.

### 7.1 Limites e ParÃ¢metros TÃ©cnicos
- Armazenamento total estimado: 5 GB;
- MÃ¡ximo por foto: 5 MB;
- MÃ¡ximo de fotos por cÃ£o: 3; bloqueio e mensagem amigÃ¡vel quando excedido;
- Alerta no Admin quando uso estimado do Storage â‰¥ 80%.

### 7.2 Tipos de Dados (resumo)
- Dog: { id, name, age, size, tags[], status, description, photos[], createdAt, updatedAt }  
- Post: { id, type, title, summary, body, photos[], date }  
- Partner: { id, name, logoUrl, siteUrl, active }  
- Result: { id, helpedCount, notes? }  
- LeadAdoption: { id, dogId, name, phone, email, message, createdAt }  
- LeadVolunteer: { id, name, phone, email, area, createdAt }  
- Flags: { adoption, donations, lostPets, partners, stories, volunteers }  
- Settings: { contact, pixKey, donationNotes? }  

## 8. Arquitetura da SoluÃ§Ã£o

### 8.1 Tecnologias e Componentes
- Frontâ€‘end: React 18 + Vite + TypeScript, Tailwind CSS, Radix UI, Lucide;
- Backâ€‘end (BaaS): Firebase Auth (admins), Firestore (dados), Cloud Storage (imagens), Firebase Hosting (deploy/CDN);
- GerÃªncia de estado: React Query (dados) e Context (flags e sessÃ£o admin);
- FormulÃ¡rios e validaÃ§Ã£o: reactâ€‘hookâ€‘form + Zod.

### 8.2 Rotas e NavegaÃ§Ã£o
- PÃºblico: /, /adocao, /adocao/:id, /doacoes, /historias, /parceiros, /voluntario;
- Admin: /admin, /admin/flags, /admin/caes, /admin/posts, /admin/parceiros, /admin/leads, /admin/resultados;
- Flags: se uma seÃ§Ã£o estiver desativada, o item Ã© ocultado e a rota redireciona para /. 

### 8.3 PWA (Manifest + Service Worker)
- Manifest com name, short_name, Ã­cones 192/512, theme/background, display=standalone;
- Service Worker com prÃ©â€‘cache do shell, runtime cache para imagens (Staleâ€‘Whileâ€‘Revalidate) e estratÃ©gia networkâ€‘first para dados;
- AtualizaÃ§Ã£o assistida: aviso â€™Nova versÃ£o disponÃ­velâ€™ com aÃ§Ã£o de atualizar.

## 9. ConfiguraÃ§Ã£o do Firebase (Setup do Zero)

### 9.1 CriaÃ§Ã£o de Projetos
- ong-caes-dev (desenvolvimento)  
- ong-caes-prod (produÃ§Ã£o)  

### 9.2 ServiÃ§os Ativados
- Authentication: eâ€‘mail/senha para administradores;
- Firestore Database: regiÃ£o recomendada southamericaâ€‘east1;
- Cloud Storage: bucket em southamericaâ€‘east1 (teto operacional 5 GB);
- Hosting: publicaÃ§Ã£o do PWA.

### 9.3 ConfiguraÃ§Ã£o Web (.env)
VariÃ¡veis mÃ­nimas: VITE_FB_API_KEY, VITE_FB_AUTH_DOMAIN, VITE_FB_PROJECT_ID, VITE_FB_STORAGE_BUCKET, VITE_FB_APP_ID.

### 9.4 Regras Iniciais do Firestore (resumo textual)
- Leitura pÃºblica: dogs, posts, partners, results;
- Leads: criaÃ§Ã£o pÃºblica; leitura/atualizaÃ§Ã£o/exclusÃ£o apenas por admin;
- Flags e settings: leitura pÃºblica; escrita apenas por admin.

### 9.5 Regras Iniciais do Storage (resumo textual)
- Leitura pÃºblica dos objetos publicados;
- Escrita apenas por usuÃ¡rios autenticados com papel admin nas pastas dogs/, posts/ e partners/.

### 9.6 Estrutura de Dados Inicial (Semente)
- /flags: { adoption: true, donations: true, lostPets: false, partners: true, stories: true, volunteers: true };
- /settings: { contact: 'email/whatsapp', pixKey: 'chave pix', donationNotes?: 'texto' };
- /dogs: cadastrar 2â€“3 exemplos; /posts: 2 exemplos; /partners: 2 exemplos.

## 10. Design e Usabilidade

### 10.1 Branding e Identidade Visual
- Conceito: natureza e cuidado; paleta com verde (#2E7D32), acqua (#00A6A6) e acento laranja (#F59E0B); neutros Slate;
- Tipografia: Inter (UI) e Merriweather (tÃ­tulos).

### 10.2 Componentes e PadrÃµes de UI
- BotÃµes (primÃ¡rio/ghost/link), Inputs/Labels, Select, Textarea, Checkbox/Radio, Cards, Badges (tags), Modais, Navbar, Footer, Toasts, Skeleton, EmptyState;
- Mensagens padrÃµes de sucesso/erro, estados de carregamento e vazios significativos;
- Acessibilidade: labels e ariaâ€‘*, foco visÃ­vel, atalhos (Esc para fechar modais, Enter para enviar).

## 11. OperaÃ§Ã£o e ManutenÃ§Ã£o
- Onboarding do administrador: criar usuÃ¡rio semente via console;
- ExportaÃ§Ã£o CSV de leads;
- Backup mensal das coleÃ§Ãµes crÃ­ticas e download dos CSV;
- Limpeza mensal de imagens Ã³rfÃ£s e auditoria de uso do Storage;
- MÃ©tricas: GA4 para eventos (view_dog, lead_*), Sentry opcional para erros.

## 12. Riscos e MitigaÃ§Ãµes
- Estouro do Storage (5 GB): compressÃ£o, limite de 5 MB por imagem e atÃ© 3 fotos por cÃ£o, auditoria mensal;
- Leituras excessivas do Firestore: paginaÃ§Ã£o, cache no cliente (React Query) e Ã­ndices;
- ConteÃºdo desatualizado: responsÃ¡vel editorial e calendÃ¡rio de revisÃ£o.

## 13. Cronograma / Roadmap
- **M1** â€“ PrototipaÃ§Ã£o e modelo de dados;
- **M2** â€“ PÃ¡ginas pÃºblicas (InÃ­cio, AdoÃ§Ã£o, DoaÃ§Ãµes, HistÃ³rias, Parceiros, VoluntÃ¡rio);
- **M3** â€“ Admin (login, flags, CRUDs, leads, resultados);
- **M4** â€“ PWA (offline bÃ¡sico) e SEO/OG;
- **M5** â€“ Testes finais e publicaÃ§Ã£o (Hosting).  
PÃ³sâ€‘MVP: mapa interativo, notificaÃ§Ãµes push, relatÃ³rios/dashboards e fluxo de adoÃ§Ã£o avanÃ§ado.

## 14. ConclusÃ£o
O projeto consolida requisitos, arquitetura e operaÃ§Ã£o de um PWA voltado a ampliar o impacto de uma ONG de cÃ£es. Com tecnologia acessÃ­vel e de baixo custo, privilegia-se a entrega rÃ¡pida e a governanÃ§a simples do conteÃºdo, mantendo um caminho de evoluÃ§Ã£o para recursos mais sofisticados.

## 15. Anexos (Exemplos Textuais)
```json
{ "name": "Luna", "age": 3, "size": "M", "tags": ["vacinado","dÃ³cil"], "status": "disponÃ­vel", "description": "Resgatada, Ã³tima com crianÃ§as.", "photos": ["https://.../dogs/123/photo_1.jpg"], "createdAt": "", "updatedAt": "" }

{ "dogId": "123", "name": "JoÃ£o Silva", "phone": "(43) 99999-9999", "email": "joao@email.com", "message": "Quero conhecer a Luna.", "createdAt": "" }

{ "adoption": true, "donations": true, "lostPets": false, "partners": true, "stories": true, "volunteers": true }
```