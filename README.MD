# Automação de Testes com Playwright

Projeto de automação end-to-end desenvolvido com **Playwright** e **TypeScript**, utilizando a aplicação pública [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/).

O objetivo deste projeto é demonstrar boas práticas de automação de testes, incluindo organização com Page Objects, reutilização de autenticação, massa de dados dinâmica, upload de arquivos, sincronização com requisições de rede, geração de evidências e integração com CI/CD.

## Tecnologias utilizadas

- Playwright
- TypeScript
- Node.js
- GitHub Actions

## Clone do projeto

Clone o repositório:

```bash
git clone https://github.com/FelipeVilar1997/automation-playwright.git
```

Acesse a pasta do projeto:

```bash
cd automation-playwright
```

## Instalação

Instale as dependências do projeto:

```bash
npm ci
```

Instale o navegador Chromium utilizado nos testes:

```bash
npx playwright install chromium
```

Em ambientes Linux, caso seja necessário instalar também as dependências do sistema:

```bash
npx playwright install --with-deps chromium
```

## Execução local

Para executar toda a suíte de testes:

```bash
npm test
```

Para executar somente no Chromium:

```bash
npm run test:chromium
```

Para executar com o navegador visível:

```bash
npm run test:headed
```

Para executar em modo debug:

```bash
npm run test:debug
```

Para validar o código TypeScript:

```bash
npm run typecheck
```

Após a execução, o relatório HTML pode ser aberto com:

```bash
npm run report
```

### Configuração local

A aplicação utilizada nos testes está configurada através do `baseURL` no arquivo:

```text
playwright.config.ts
```

A autenticação é realizada automaticamente pelo `globalSetup` antes da execução da suíte.

Após o login, o estado autenticado é salvo utilizando `storageState` em:

```text
playwright/.auth/admin.json
```

Por isso, não é necessário realizar nenhuma configuração manual de autenticação antes de executar os testes localmente.

> O arquivo de autenticação é gerado durante a execução e não deve ser versionado no repositório.

## Cenários automatizados

### Buzz

| ID | Cenário | Tipo |
|---|---|---|
| CT01 | Criar publicação somente com texto | Positivo |
| CT02 | Criar publicação com imagem | Positivo |
| CT03 | Rejeitar formato de arquivo não suportado | Negativo |

### CT01 - Publicação somente com texto

Valida que um usuário autenticado consegue:

- criar uma publicação somente com texto;
- receber o feedback de sucesso;
- atualizar o feed do Buzz;
- localizar a publicação criada no Newsfeed.

Os dados utilizados são gerados dinamicamente para evitar conflito entre diferentes execuções.

### CT02 - Publicação com imagem

Valida que um usuário autenticado consegue:

- abrir a modal de compartilhamento de fotos;
- realizar o upload de uma imagem válida;
- criar uma publicação contendo texto e imagem;
- sincronizar a execução com as requisições da API do Buzz;
- atualizar o Newsfeed;
- validar o texto e a imagem da publicação criada.

### CT03 - Arquivo não suportado

Cenário negativo que valida o comportamento da aplicação ao tentar anexar um arquivo com formato não suportado.

O teste verifica se a aplicação rejeita o arquivo inválido e impede que o fluxo de publicação continue.

## Estrutura do projeto

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── fixtures/
│   └── app.fixture.ts
│
├── pages/
│   ├── buzz.page.ts
│   ├── dashboard.page.ts
│   └── login.page.ts
│
├── playwright/
│   └── .auth/
│
├── test-data/
│   ├── files/
│   │   ├── test-valid.jpeg
│   │   └── test-invalid-file.pdf
│   └── user.ts
│
├── tests/
│   ├── e2e/
│   │   └── buzz.spec.ts
│   └── setup/
│       └── global.setup.ts
│
├── utils/
│   └── logger.ts
│
├── playwright.config.ts
├── package.json
└── tsconfig.json