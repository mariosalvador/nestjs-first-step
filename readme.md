# NestJS Clean Architecture API

Este é um projeto de estudos desenvolvido para aplicar conceitos avançados de engenharia de software, focado em **Clean Architecture** (Arquitetura Limpa) e **Domain-Driven Design (DDD)** utilizando o framework **NestJS**.

## 🚀 Tecnologias

O projeto utiliza um stack moderno focado em performance, tipagem forte e boas práticas:

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo para construir aplicações eficientes e escaláveis.
- **[Prisma ORM](https://www.prisma.io/)** - ORM moderno para Node.js e TypeScript.
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional (via Docker).
- **[Redis](https://redis.io/)** - Banco de dados em memória utilizado para Cache (via Docker).
- **[Zod](https://zod.dev/)** - Validação de schemas e dados.
- **[JWT & Passport](https://docs.nestjs.com/security/authentication)** - Autenticação e autorização seguras.
- **[Vitest](https://vitest.dev/)** - Framework de testes ultra rápido.
- **[AWS SDK (S3)](https://aws.amazon.com/s3/)** - Integração com storage de arquivos.

## 🏗️ Arquitetura e Estrutura

O projeto foi rigorosamente estruturado seguindo os princípios de **Clean Architecture** e **DDD (Domain-Driven Design)**, separando as responsabilidades em camadas e domínios independentes de frameworks externos.

### Domínios
- **Forum**: Gerenciamento de perguntas (Questions), respostas (Answers), comentários e anexos (Attachments).
- **Notifications**: Sistema de envio e controle de notificações para os usuários.

### Camadas (dentro de `src/`)
- **`core/`**: Classes base, lógicas compartilhadas, abstrações de entidades e erros genéricos aplicáveis a qualquer domínio.
- **`domain/`**: Coração da aplicação. Contém as regras de negócio puras.
  - *Enterprise (Entities)*: Entidades de domínio e objetos de valor (Value Objects).
  - *Application (Use Cases)*: Casos de uso da aplicação, contratos de repositórios e serviços.
- **`infra/`**: Camada de infraestrutura, responsável por conectar o domínio com o mundo exterior (Framework, Banco de dados, Cache, HTTP, Cryptography, etc.).
- **`helpers/`**: Funções utilitárias.

## ⚙️ Como Executar

### Pré-requisitos
- [Node.js](https://nodejs.org/en/) (versão 18+)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

### Passos

1. **Clone o repositório**
2. **Instale as dependências**
   Recomenda-se o uso do `npm` ou `pnpm`:
   ```bash
   npm install
   ```
3. **Suba os serviços de infraestrutura (Banco e Cache)**
   Inicie o PostgreSQL e o Redis usando o Docker Compose:
   ```bash
   docker-compose up -d
   ```
4. **Configuração das Variáveis de Ambiente**
   Crie um arquivo `.env` na raiz do projeto baseado nas necessidades (ex: URL do banco, Redis, AWS keys).
5. **Chaves JWT**
   O projeto utiliza chaves assimétricas (`private.pem` e `public.pem`) para assinar e validar os tokens JWT. Certifique-se de gerá-las e referenciá-las corretamente no ambiente.
6. **Execute as Migrations do Banco de Dados**
   ```bash
   npx prisma migrate dev
   ```
7. **Inicie a Aplicação**
   ```bash
   npm run start:dev
   ```

A API estará rodando localmente, pronta para receber requisições através dos controllers HTTP na camada de infraestrutura.
